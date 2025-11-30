---
title: "How to Build a Cost-Efficient AI Workstation"
description: ''
pubDate: 2025-08-30
categories: 
  - "ai"
heroImage: "images/c026a994-904d-44b2-bdd0-9f1314e3b488.png"
---

In August 2025, **[Andreessen Horowitz (a16z)](https://a16z.com/)** published a [detailed article](https://a16z.com/building-a16zs-personal-ai-workstation-with-four-nvidia-rtx-6000-pro-blackwell-max-q-gpus/) about their **personal AI workstation**: a Threadripper Pro machine equipped with **four NVIDIA RTX 6000 Pro Blackwell Max-Q GPUs**, each with 96 GB of VRAM. In total, that’s **384 GB of GPU memory under one desk** – the kind of setup normally reserved for datacenters.

![4-GPU AI workstation build with RTX A6000 cards](images/image-1-300x149.png)

The price? Easily **35 000 €–40 000 €** in Europe _for the GPUs alone_, with a full system reaching **+50 000 €**. For startups, independent researchers, or small consulting firms, that’s a prohibitive cost.

![](images/sentra_brain-1-150x150.webp)

With **[Sentra Brain](https://sentrabrain.com/)**, I design and deliver **[private AI systems](https://jgcarmona.com/ia-privada-pymes-rag-fine-tuning/)** for clients who need serious local AI power – for fine-tuning, inference, or running private agent frameworks – but at a realistic budget. That’s why I explored: _how can we build a “cheap” (or at least cheaper) AI workstation in Spain/Europe that still delivers 4-GPU performance?_

## The Target: A “Cheap” 4-GPU AI Workstation

The goal is not to match a16z’s monster spec euro for euro, but to **replicate the concept**: four high-VRAM GPUs, a many-core CPU with enough PCIe lanes, plenty of ECC memory, fast NVMe storage, and a PSU/case that can handle it.

Instead of spending 50 000 €, we aim for something in the **14 000 €–16 000 € range**, while keeping performance suitable for real-world LLM training and inference.

![](images/c026a994-904d-44b2-bdd0-9f1314e3b488.png)

This is the kind of **Sentra Brain-ready workstation** I would recommend to clients who want **on-prem AI without cloud costs or data leakage risks**.

## Step 1: Choose the Right GPUs (the Heart of the Build)

- **Option A (Recommended): NVIDIA RTX A6000 48 GB (Ampere)**
    - Used/refurbished market in Europe: **2 600 €–3 000 € each**
    
    - Four cards = ~**11 000 €**
    
    - 192 GB total VRAM, blower design (perfect for 4-GPU stability)
    
    - ECC memory, NVLink support, designed for 24/7 workstation duty

- **Option B (Ultra Budget): NVIDIA RTX 3090 24 GB**
    - Used market: **700 €–800 € each**
    
    - Four cards = ~**3 000 €**
    
    - 96 GB total VRAM, but open-air cooling and higher power draw make 4-GPU use tricky

- **Option C: NVIDIA RTX 4090 24 GB**
    - New: ~**1 700 €–1 900 € each in Spain**
    
    - Four cards = ~**7 000 €**
    
    - Extreme performance, but power draw and cooling are problematic without dual PSUs or water-cooling

**Verdict:** For professional, stable use, the **RTX A6000 (48 GB)** is the sweet spot. Half the VRAM of Blackwell 96 GB, but at one-third the cost.

## Step 2: CPU & Motherboard (PCIe Lanes Matter)

- **CPU: AMD Threadripper PRO 5975WX (32 cores)**
    - Used/OEM market: ~**1 300 €–1 500 €**
    
    - 128 PCIe 4.0 lanes, 8-channel memory – critical for four GPUs at full x16 bandwidth.

- **Motherboard: WRX80 workstation board (Asus Pro WS WRX80E, Supermicro M12SWA, etc.)**
    - Used: ~**500 €–700 €**
    
    - Supports 4–7 PCIe x16 slots, E-ATX/SSI-EEB size.

## Step 3: Memory (ECC for Stability)

- **128 GB DDR4 ECC Registered (8×16 GB, 3200 MT/s)**
    - Market price in Spain: ~**350 €–400 €**
    
    - 8 channels fully populated = maximum bandwidth.

- Optional upgrade: 256 GB (8×32 GB) if you handle very large datasets (~**800 €**).

## Step 4: Storage (Fast, but Affordable)

- **2× 2 TB NVMe Gen4 SSDs (Samsung 990 Pro, WD SN850X, etc.)**
    - ~**150 € each** → **300 € total**
    
    - Either stripe (RAID0) for 14 GB/s throughput or split OS vs data.

- Optional bulk: 4 TB SATA SSD or HDD for archives (~**200 €–300 €**).

## Step 5: Power, Cooling, and Case

- **PSU: Corsair AX1600i (1600 W, 80+ Titanium)** → ~**450 €–500 €**

- **Cooling: 360 mm AIO for CPU (Arctic LF II 420 TR4, etc.)** → ~**180 €**

- **Case: Phanteks Enthoo Pro 2, Corsair 7000D Airflow, or Fractal Define 7 XL** → ~**200 €–250 €**

- **Extra fans** (high airflow, e.g., Arctic P14) → ~**80 €–100 €**

## Total Cost (Spain/Europe, Q3 2025)

| Component | Estimated € |
| --- | --- |
| 4× RTX A6000 48 GB (used) | 11 000 €–12 000 € |
| CPU (TR Pro 5975WX) | 1 400 € |
| Motherboard (WRX80) | 600 € |
| Memory (128 GB ECC) | 400 € |
| Storage (2× 2 TB NVMe) | 300 € |
| PSU (1600 W) | 500 € |
| Cooling + Case + Fans | 500 € |
| **Total** | **14 500 €–15 500 €** |

Compare that to the 50 000 € a16z setup – we’re at **~30 % of the cost** while keeping ~70–80 % of the capability.

## Trade-Offs

- VRAM: 192 GB vs 384 GB (but still enough for most LLMs with quantization).

- PCIe 4.0 vs PCIe 5.0 (no real loss for current GPUs).

- Used components (less warranty, but massive cost savings).

- Noise & heat: a 1.5 kW system will sound like a server.

## Why This Matters for Sentra Brain

Many SMEs, law firms, or advisory firms in Spain ask me the same thing:

> _“Can we run large AI models on-premise, without paying cloud bills or sending client data outside?”_

The answer is yes – with workstations like this. With **Sentra Brain**, my team and I help clients **design, source, and deploy** cost-efficient AI hardware (or hybrid infrastructure), and then **customize the software stack** so it’s ready for private LLMs, agents, and secure integrations.

Instead of renting A100s or H100s in the cloud for 10–20 €/hour, you own your machine. Within months, the workstation pays for itself. And, critically, your **data never leaves your office**.

## Conclusion

The a16z “personal AI workstation” showed what’s possible at the bleeding edge – but also how expensive it can be. With careful part selection, a bit of the used market, and a focus on value, you can build a **15 000 € AI supercomputer under your desk** in Spain or Europe.

That’s exactly the kind of solution I bring to clients with **Sentra Brain**: powerful, affordable, and entirely under your control.
