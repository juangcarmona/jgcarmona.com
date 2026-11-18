---
title: 'AIholism: Just One More Project'
description: 'I keep starting projects, opening conversations, and investing more time and money in AI. What happens when implementation no longer makes me stop?'
pubDate: 2026-11-16
lang: en
heroImage: 'images/aiholism-support-circle-v2.png'
tags:
  - artificial-intelligence
  - software-engineering
  - personal
---

> “Hi, my name is Juan, and I’m addicted to AI.”

I remember when the [GPT-2 announcement](https://openai.com/index/better-language-models/) started making noise. That was when I began paying attention to OpenAI and what they were doing with language models. When [GPT-3](https://arxiv.org/abs/2005.14165) arrived the following year, it looked promising, and I wanted to see what we could do with it.

Then [ChatGPT arrived in late 2022](https://openai.com/index/chatgpt/), based on GPT-3.5. It was just a chat: you typed something and it answered. After fifteen minutes of silly questions, we started asking it to write code. And **f · · k!** it was surprisingly good at low-level code and at helping us solve some very big problems. Two days after its release, **we were vibe coding even before it was called vibe coding.**

I have to admit that we were taking risks we didn’t fully understand. We were sharing code, sometimes including sensitive data. We tried to keep that material out, but things still slipped through. Looking back, I see a parallel with drugs: we were passing things around without thinking enough about what we were exposing. It was easy to overlook the risk when the code it gave us was solving difficult problems.

![Juan and two others discreetly passing a prompt in a dimly lit room, evoking the risks they did not yet understand.](images/aiholism-risky-prompts.png)

We learned what we could share and what we needed to keep out, how to strip context from an example without making it useless, and when the AI needed more detail. We made mistakes along the way. As we got better at explaining what we wanted, the conversations became more useful and the projects more ambitious.

That concern about sharing data also led me to invest in my own AI. I didn’t have the technical resources of a large company, so I bought a high-end, and super expensive, graphics card. I wanted to work with code and sensitive data on hardware I controlled. That was how I got into local AI.

![An illustration of Juan studying alone in dark catacombs, surrounded by laptops, books and AI hardware.](images/aiholism-juan-catacombs-v3.png)

From there, I went down into the catacombs of local AI, getting to grips with [llama.cpp](https://github.com/ggml-org/llama.cpp) (congrats on finally shipping [v1.0](https://huggingface.co/blog/ggml-org/llama-cpp-v1)!) and [vLLM](https://docs.vllm.ai/en/latest/), figuring out how to get all of this running and what inference actually meant. I read about tokens, quantization, models and their formats, optimizations and C code because I wanted to understand what was happening down in the guts of these systems. I had the hardware to experiment on, and there was so much to learn... Those were chaotic times: reading, thinking, trying things, then going back to investigate whatever I hadn’t understood.

Over time, I devoured [Chip Huyen’s books](https://huyenchip.com/books/), Victor Dibia’s [Designing Multi-Agent Systems](https://multiagentbook.com/) and Sam Bhagwat’s [Principles of Building AI Agents](https://mastra.ai/books/principles-of-building-ai-agents). I also read [Agentic Artificial Intelligence: Harnessing AI Agents to Reinvent Business, Work and Life](https://play.google.com/store/books/details/Pascal_Bornet_Agentic_Artificial_Intelligence?id=xwxPEQAAQBAJ), by Pascal Bornet, Jochen Wirtz, Thomas H. Davenport, David De Cremer, Brian Evergreen, Phil Fersht, Rakesh Gohel, Shail Khiyara, Pooja Sund and Nandan Mullakara. I followed [Mitko Vasilev](https://www.linkedin.com/in/ownyourai/) closely, alongside [Addy Osmani](https://addyosmani.com/), [Matt Pocock](https://www.mattpocock.com/), the people at [Hugging Face](https://huggingface.co/blog) and many others. Between the books and what they were sharing, I always had something else to try with open models and quantization in my own setup(s). I’d gone well beyond the original concern about sharing data.

When I joined [Plain Concepts](https://www.plainconcepts.com/), I found people who gave me room to keep exploring. I had to prove myself first, and I’ve learned a huge amount here over the past year. 2026 started with all the talk about agents. Since then, I’ve helped teams use Copilot, write instructions, work with agents, skills and commands, and rethink their software development lifecycle. That has meant training whole teams, working on technology migrations and running pilots, learning alongside the people I was helping.

I’m particularly proud of my time as chair of the DevEx chapter, helping organise weekly roundtables where colleagues across Plain Concepts could discuss the latest changes in software development and share what they were trying. I’ve also lent a hand with the team’s [Agentic Workflows](https://github.com/PlainConceptsPlatform/agentic-workflows), built on [GitHub Agentic Workflows](https://github.github.com/gh-aw/), and a few other repositories in [Plain Concepts’ Platform](https://platform.plainconcepts.dev/). The credit for that work belongs to the team; I’ve helped where I could. I love being involved while we’re still figuring all this out. Between those discussions and the projects, my list of things to investigate keeps growing.

## Too many open conversations

I keep starting projects every couple of days. Some become useful products or services; others go nowhere. I have **far too many conversations open**, and I keep spending more on AI. I can spend ten or twelve hours at the computer, then carry on checking my agents from my phone. All that time is taking a physical toll that I’m finding harder to ignore.

Some people now see me as a sort of guru, which feels odd when I still have so much to learn. I enjoy explaining the "black magic" and helping people get into this stuff. I’m still studying, and useful software comes out of these experiments.

## The work I keep creating

I’ve always loved writing code. Now I spend more time improving the engineering processes we used to rush because we had to deliver. I’ve built plugins and commands, both open source and for clients, for agentic workflows across the SDLC. I use parallel coding agents and unattended GitHub workflows to handle more of the implementation, then put the time into improving those processes. While I’m waiting for an agent to finish, I’m already thinking of the next thing I want to try.

[Product Definition as Code](https://pdac.dev/) grew out of that work. I studied and adapted established product engineering practices into versioned artifacts that help agents stick to the product we’ve agreed to build. [ProductShape](https://productshape.dev/) is its first implementation, which I’m already using in my own projects and with clients and friends. I’ve written about [where those ideas come from](https://pdac.dev/articles/what-product-definition-as-code-puts-together/).

Then I found more work in architecture documentation. I went back to [arc42](https://arc42.org/), my usual reference, and started with ADRs, then added metadata. Five or six iterations later, that became [ArcShape](https://arcshape.dev/): structured architecture documentation with diagrams, a navigable reader and metadata to help humans and agents find and understand the relevant context. With product and architecture defined, my SDD workflows can focus on small delivery tasks: refine them, split them up and implement them.

I’m also putting these pieces together in my own agentic development setup, [Lighthouse](https://lighthouse.jgcarmona.com/), building on the work in [Plain Concepts’ open-source Platform](https://platform.plainconcepts.dev/). My setup runs on a machine on my local network, with several repositories already using its workflows. In several real end-to-end tests, a well-refined issue has made it through to a feature running in production.

Lighthouse is my big hope here. If I can get that working reliably, more ideas could move from my head to the backlog and into production without needing me at every step. For now, I’m still building it and reviewing what it does. Teaching and sharing the work brings feedback that gives me more to improve.

---

![Juan in his catacomb workspace, surrounded by mountains of books and colorful sticky notes.](images/aiholism-sticky-note-backlog.png)


> “I can end up with more work precisely because the tools are helping.”

---

## The grey area

The other day my body gave me a warning: a bit of neck pain, then, two days later, three numb fingers. They still hurt, and I’ve dictated everything you’re reading here using speech-to-text. That warning made me look at the hours I’ve been putting in. I’ve been developing software for twenty years and have always been a workaholic when I enjoy the work. AI has given that habit more room. But this is a marathon, and I’ve been sprinting for too many months already. So, if I want to stay curious and keep building for years, I need a pace I can sustain.

![Juan paused at the catacomb entrance, phone in hand, looking back at his workspace while a path leads outside.](images/aiholism-grey-area-threshold.png)

That led me to read about workaholism and AI use. A [meta-analysis of workaholism](https://doi.org/10.1177/0149206314522301) links it with stress, burnout and work–life conflict. In [Berkeley’s eight-month study](https://newsroom.haas.berkeley.edu/ai-promised-to-free-up-workers-time-uc-berkeley-haas-researchers-found-the-opposite/), researchers saw work spill into breaks and evenings. It’s still research in progress at one company. A [review of problematic AI use](https://pubmed.ncbi.nlm.nih.gov/42495221/) found that studies often use different definitions of the problem. It doesn’t show that coding agents cause addiction, and *AIholism* isn’t an established clinical diagnosis.

I also found a [randomised experiment across 66 firms](https://arxiv.org/abs/2504.11436v4) where people using AI spent less time on email and worked less outside regular hours. They were using office assistance tools, so I can’t assume the same would happen with coding agents. I’d like to get some of that time back myself.

![Juan seen from behind, practising seated meditation on a yoga mat beside the catacomb entrance in the morning.](images/aiholism-morning-yoga-back-view.png)

I’ve always enjoyed outdoor sport, but between the summer heat and the hours I give to client projects and my own ideas, I can always find an excuse to skip it. Since that warning, I’ve decided some things can wait, and some might even benefit from it. I’m checking my chair, screen height and posture, and starting my mornings with twenty to thirty minutes of yoga before coffee, before the kids wake up and before I sit down at the computer. I want to run more often and get back to the mountains. I’ve still got plenty I want to do in software engineering, and I’d like to keep enjoying it for years.

> **With AI, we need to learn when to stop and recognise that subtle grey area between use and abuse.**

**Bibliography**

**Software engineering**

- [Product Definition as Code.](https://pdac.dev/)
- [Where Product Definition as Code comes from.](https://pdac.dev/articles/what-product-definition-as-code-puts-together/)
- [ProductShape.](https://productshape.dev/)
- [ArcShape.](https://arcshape.dev/)
- [Lighthouse.](https://lighthouse.jgcarmona.com/)
- [arc42.](https://arc42.org/)

**Health, AI use and workaholism**

- Clark et al. (2016). [All Work and No Play? A Meta-Analytic Examination of the Correlates and Outcomes of Workaholism.](https://doi.org/10.1177/0149206314522301) *Journal of Management*.
- Counts (2026). [Berkeley Haas’s account of Ye and Ranganathan’s work-intensification research.](https://newsroom.haas.berkeley.edu/ai-promised-to-free-up-workers-time-uc-berkeley-haas-researchers-found-the-opposite/) Institutional reporting on an ongoing ethnographic study.
- Dagnino et al. (2026). [Addicted, attached, or just delegating? A scoping review on “problematic artificial intelligence use.”](https://pubmed.ncbi.nlm.nih.gov/42495221/) *Frontiers in Psychology*.
- Dillon et al. (2025, revised November). [Shifting Work Patterns with Generative AI.](https://arxiv.org/abs/2504.11436v4) Working paper reporting a randomised field experiment.
