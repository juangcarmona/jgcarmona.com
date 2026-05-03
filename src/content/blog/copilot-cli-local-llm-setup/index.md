---
lang: en
title: "Running GitHub Copilot CLI Against a Local LLM"
description: "The complete wiring guide: environment variables, vLLM and llama.cpp server configs, localhost vs LAN endpoints, debugging /v1/models, and every common failure mode."
pubDate: 2026-05-02
tags:
  - ai
  - local-ai
  - llm
  - devops
  - engineering
  - github
  - github-copilot
---

# Running GitHub Copilot CLI Against a Local LLM

> This is article 2 of a series. Start with [How I Made GitHub Copilot CLI Mine](https://jgcarmona.com/en/github-copilot-cli-with-local-llms-and-sdd/) if you want the full picture first.

In the previous article I showed my actual setup: vLLM with Qwen 3.6 27B on an NVIDIA A6000, a PowerShell function to switch between cloud and local, and the general architecture. Today I want to go deeper into the wiring itself, because the devil is in the details and the details are what make the difference between "it kinda works" and "it's reliable."

## The environment variables

Copilot CLI supports what GitHub calls BYOK (Bring Your Own Key) mode. In practice, it means you set a handful of environment variables and Copilot redirects all model traffic to your endpoint instead of GitHub's cloud.

The critical ones:

| Variable | Purpose | Example |
| --- | --- | --- |
| `COPILOT_PROVIDER_TYPE` | Protocol family | `openai` |
| `COPILOT_PROVIDER_BASE_URL` | Your server's API root | `http://localhost:8002/v1` |
| `COPILOT_PROVIDER_API_KEY` | API key (any dummy value works for local) | `dummy` |
| `COPILOT_MODEL` | Model name as reported by `/v1/models` | `qwen-agent` |
| `COPILOT_OFFLINE` | Disable all GitHub network calls | `true` |

That's it. Five variables. No ceremony.

### On Bash / Zsh

```bash
export COPILOT_PROVIDER_TYPE="openai"
export COPILOT_PROVIDER_BASE_URL="http://localhost:8002/v1"
export COPILOT_PROVIDER_API_KEY="dummy"
export COPILOT_MODEL="qwen-agent"
export COPILOT_OFFLINE="true"
```

### On PowerShell

```powershell
$env:COPILOT_PROVIDER_TYPE = "openai"
$env:COPILOT_PROVIDER_BASE_URL = "http://localhost:8002/v1"
$env:COPILOT_PROVIDER_API_KEY = "dummy"
$env:COPILOT_MODEL = "qwen-agent"
$env:COPILOT_OFFLINE = "true"
```

### The dual-mode trick

What I actually use is a PowerShell function in my profile so I can run both cloud and local Copilot from the same terminal:

```powershell
function copilot-local {
    $env:COPILOT_PROVIDER_TYPE = "openai"
    $env:COPILOT_PROVIDER_BASE_URL = "http://localhost:8002/v1"
    $env:COPILOT_PROVIDER_API_KEY = "dummy"
    $env:COPILOT_MODEL = "qwen-agent"
    $env:COPILOT_OFFLINE = "true"
    copilot @args
}
```

`copilot-local` hits my workstation. `copilot` hits the cloud. Both coexist.

## Local, LAN, or VPN: where the server lives

The base URL does not have to be `localhost`. It can be any reachable IP.

My vLLM server runs on a dedicated Linux workstation behind WSL. When I'm on the same machine, the URL is `http://localhost:8002/v1`. When I'm on my laptop elsewhere in the house, it becomes `http://192.168.1.X:8002/v1`. When I'm outside, I reach it through my VPN with the same internal IP.

Same function. Different URL. Same result.

This means your inference server can be a shared resource across your machines. One GPU, many clients.

## Setting up vLLM

vLLM is my runtime of choice because I have the VRAM for it. Install in a Python environment:

```bash
pip install vllm
```

A minimal serve command:

```bash
vllm serve Qwen/Qwen3-27B --host 0.0.0.0 --port 8002
```

But for Copilot CLI to use tool-calling properly, you want more flags:

```bash
vllm serve Qwen/Qwen3-27B \
  --host 0.0.0.0 \
  --port 8002 \
  --served-model-name qwen-agent \
  --dtype auto \
  --max-model-len 32768 \
  --enable-auto-tool-choice \
  --tool-call-parser hermes
```

The critical ones for Copilot:

- `--served-model-name`: this is what appears in `/v1/models` and must match `COPILOT_MODEL` exactly
- `--enable-auto-tool-choice`: lets the model emit structured tool calls instead of plain text
- `--tool-call-parser hermes`: tells vLLM how to parse tool-call JSON from the model's output (Qwen models use the Hermes format)

Without these, Copilot might connect but the agent layer won't work. The model will just print JSON text instead of invoking tools. That's one of the most common "it connects but it's useless" failures.

## Setting up llama.cpp (the alternative)

If you don't have a fat GPU, `llama.cpp` is the pragmatic workhorse. It runs on CPUs, works with quantized GGUF models, and can use GPU offload when available.

Build it:

```bash
git clone https://github.com/ggml-org/llama.cpp.git
cd llama.cpp
make
```

Run a model server:

```bash
llama-server -m ./models/qwen2.5-coder-7b-instruct-q4.gguf --port 11434
```

With GPU offload:

```bash
llama-server -m ./models/qwen2.5-coder-7b-instruct-q4.gguf \
  --port 11434 \
  --n-gpu-layers 999 \
  --threads 8
```

Then point Copilot to it:

```bash
export COPILOT_PROVIDER_BASE_URL="http://localhost:11434/v1"
```

The beauty of `llama.cpp` is that quantization makes local inference viable on hardware that would otherwise be excluded from the game. A coding-tuned 7B or 8B model in Q4 is usually the honest starting point for most hardware.

## Choosing a model without lying to yourself

This is where many people become romantic. Do not do that. Pick a model that your machine can actually run well.

- **1.5B to 3B**: fast, cheap, useful for lightweight tasks, but limited
- **7B to 8B**: current sweet spot for many local developer workflows
- **14B and above**: can be very good, but hardware pressure starts getting real
- **27B+ (my case)**: requires serious VRAM, but the quality jump is noticeable for agentic tool-calling

If you are on `llama.cpp`, a coding-tuned instruct model in Q4 or Q5 is usually the most practical answer. If you have a fat GPU and run vLLM, you can afford FP16 or BF16 and skip the quant dance entirely.

Not the sexiest answer. The honest one.

## Debugging: the `/v1/models` test

Before you even touch Copilot, verify your server is alive and reporting the right model name:

```bash
curl http://localhost:8002/v1/models
```

You should see your model name in the response. That name must match `COPILOT_MODEL` exactly. Character for character. Case-sensitive.

If `curl` fails, your server isn't running or isn't listening on that port. If it returns a different model name, update your env var.

This simple test prevents 90% of the "why doesn't it connect" questions.

## Common failure modes

### Connection refused

The server isn't running or isn't bound to the right interface. If your server binds to `127.0.0.1` and you're connecting from another machine, it will refuse. Use `--host 0.0.0.0` to bind to all interfaces.

### Model name mismatch

`COPILOT_MODEL` must match exactly what `/v1/models` returns. If vLLM reports `Qwen/Qwen3-27B` but you used `--served-model-name qwen-agent`, then `COPILOT_MODEL` must be `qwen-agent`.

### Tool calls don't work

The model connects, Copilot responds, but it never actually invokes tools. It just prints JSON as text. This means you're missing `--enable-auto-tool-choice` and/or the right `--tool-call-parser` on your vLLM server. With `llama.cpp`, tool-calling support depends on the build and the model.

### The model is connected but useless

This usually means the model is too small, too general, or just bad at coding tasks. Try a coding-tuned instruct model. Not every 7B model is equal.

### Copilot still uses the cloud

Make sure `COPILOT_OFFLINE=true` is exported in the same shell session where you run Copilot. If you set it in one terminal and run Copilot in another, it won't see the variable.

### Base URL trailing slash issues

Some servers want `http://localhost:8002/v1`, others want `http://localhost:8002/v1/`. If things fail, try with and without the trailing slash.

### Performance is miserable

That's usually memory pressure, not a lack of theoretical intelligence. If you read [Local LLMs Under the Hood](https://jgcarmona.com/en/local-llms-under-the-hood/) you already know why: the KV cache grows with every token, and memory pressure adds latency. Try a smaller model, lower quantization, or shorter context.

## Offline mode: what it actually means

Setting `COPILOT_OFFLINE=true` disables all GitHub network calls. No telemetry. No authentication. No cloud features.

That means:

- your code and prompts never leave your machine
- GitHub login is not required
- features like `/delegate` and Code Search are unavailable
- MCP servers that depend on GitHub APIs won't work

If you want privacy and cost control, offline mode is the answer. If you also want some cloud features, skip it and just set the provider variables to redirect model traffic while keeping GitHub auth active.

## This series

1. [How I Made GitHub Copilot CLI Mine](https://jgcarmona.com/en/github-copilot-cli-with-local-llms-and-sdd/) -> the manifesto and real setup story
2. **You are here** -> Running GitHub Copilot CLI Against a Local LLM
3. [MCP Is How Local Copilot Becomes Useful](https://jgcarmona.com/en/copilot-cli-mcp-tools/) -> tools, not magic
4. [Copilot Instructions, Agents, and Skills: The Missing Control Layer](https://jgcarmona.com/en/copilot-instructions-agents-skills/) -> the control surface
5. [Running SDD Workflows with Local Copilot](https://jgcarmona.com/en/copilot-cli-sdd-workflows/) -> specification-driven development end-to-end

## References

- [How I Made GitHub Copilot CLI Mine](https://jgcarmona.com/en/github-copilot-cli-with-local-llms-and-sdd/) -> the setup story
- [Local LLMs Under the Hood](https://jgcarmona.com/en/local-llms-under-the-hood/) -> why memory is the bottleneck
- [GitHub Copilot CLI documentation](https://docs.github.com/en/copilot/copilot-cli) -> official reference
- [vLLM documentation](https://docs.vllm.ai/) -> the inference platform
- [llama.cpp](https://github.com/ggml-org/llama.cpp) -> the portable inference engine

---

Remember:

> ## Your AI. Your rules.
