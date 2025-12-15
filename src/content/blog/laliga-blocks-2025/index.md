---
title: "How LaLiga Broke My Site (and many more)"
description: "How anti-piracy measures by LaLiga and Spanish ISPs are causing widespread collateral damage, affecting innocent websites and digital rights."
pubDate: 2025-12-01
heroImage: './images/laliga_logo.webp'
---

I had one goal: rebuild my personal site now that I’m not running a business anymore. A calm, geeky sunday morning.

> Export WordPress → Setup Astro → Deploy to Azure Static Web App → Update DNS → Done!

Everything worked. Every single step. Until I moved the DNS from WordPress to Cloudflare. The moment the cutover happened, **the site vanished**.

I spent hours tearing everything apart. DNS dumps, flushing caches, comparing records, checking Azure, checking Cloudflare, comparing with other sites I run under the same setup. Nothing matched the symptoms. Nothing pointed to a mistake.

It made **zero technical sense**.

Then, that evening, I found a LinkedIn post by [Daniel Garcia (cr0hn)](https://www.linkedin.com/in/garciagarciadaniel) sharing  
[a protest proposal against #LaLigaGate](https://www.linkedin.com/posts/garciagarciadaniel_laligagate-activity-7400936171658285056-mv00).

> Suddenly, the whole thing clicked.

## What LaLiga is doing (and why it might be affecting you)

* In **December 2024**, a judge (Commercial Court No. 6 of Barcelona) authorized LaLiga to request ISPs to block **IPs, domains, or URLs** associated with illegal football broadcasts. ([Wikipedia][1])
* From **February 2025**, several operators began applying these *dynamic* blocks, activated on match days. ([20minutos][2])
* LaLiga says it is fighting piracy; the official goal is to stop illegal streams. ([Wikipedia][1])

> The execution, though, is **far from precise**.

LaLiga’s blocking system doesn’t just target “pirate” hosts. It hits **IPs and IP ranges**. If any illegal stream ever touched an IP within a shared infrastructure, everything behind that IP may get blocked for hours.

CDNs? Cloudflare? Shared hosting?  **Collateral damage.**

My site just happened to be standing in the wrong DNS zone. Wrong place at the wrong time.

## Side Effects

Think about the effects of this network vandalism:

### Harm to Innocent Third Parties

* Websites that have **nothing to do with football**, media, blogs, apps, stores, services, have been suddenly unreachable. ([El País][3])
* Even major platforms have suffered outages: social networks, payment gateways, video games, companies, online shops. ([El País][3])
* The reason is simple: block one shared IP → everything behind it goes down. ([OndaCero][4])

### Impact on Digital Rights

* Reported violations include: freedom of information, free expression, and free competition. ([El País][3])
* What should be an anti-piracy action behaves like a **broad internet blackout**, with absolutely no transparency. ([Social Future][5])

### Ecosystem Instability

* Blocks depend on the match, the operator, and the IP involved: completely unpredictable. ([El País][3])
* Businesses lose credibility and revenue; infrastructure and services look unreliable. ([Marketing4eCommerce][6])

### Institutional and Legal Conflict

* **RootedCON** has appealed to the Spanish Constitutional Court, arguing lack of proportionality, oversight, and safeguards. ([Europa Press][7])
* Congress attempted a non-binding resolution to limit these measures, and it failed. ([Europa Press][8])
* Many experts see this as a dangerous precedent for **private internet censorship**. ([Social Future][5])

### ⚠️ Why this is a scandal ⚠️ 

* A private action (backed by a court) is affecting **thousands of innocent websites**.
* Blocking criteria are **overbroad**: IP ranges, CDNs, shared infra... No proportionality.
* Fundamental rights are impacted: access, information, expression, competition.
* No transparency: there are no public lists. We don’t know **what** is blocked, nor **when**, nor **why**.
* It undermines trust in digital ecosystems, hosting, entrepreneurship, and infrastructure.
* It sets a precedent for **private Internet censorship**, outside general legal frameworks.

## What can we do? Protests and Mobilize

* [RootedCON](https://rootedcon.com/) filed [an appeal for protection of fundamental rights](https://rootedcon.com/la-liga-gate/) before the Constitutional Court, citing “arbitrary measures, without guarantees, with massive impact on legitimate websites.” ([Europa Press][7])
* [RootedCON + HackBCN coordinate community support](https://rootedcon.com/rootedcon-y-hackbcn-se-unen-para-ofrecer-apoyo-tecnico-y-judicial-a-las-victimas-de-laligagate/), legal analysis, and technical guidance. ([Social Future][5])
* Journalists and digital-rights advocates warn of the long-term consequences: partial internet blackouts and censorship precedents. ([OndaCero][4])


#### Next time your website or service suddenly dies, don’t assume something is broken or down. It might just be match day.

> **LaLiga did.**

---

[1]: https://en.wikipedia.org/wiki/LaLiga
[2]: https://www.20minutos.es/ultima-hora/actualidad/examen-sistema-dinamico-bloqueo-la-liga-lucha-pirateria-5738914/
[3]: https://elpais.com/tecnologia/2025-02-17/el-bloqueo-dinamico-avanza-en-espana-hay-afectados-todos-los-fines-de-semana.html
[4]: https://www.ondacero.es/noticias/sociedad/bloqueo-dinamico-liga-pirateria-perjudica-usuarios_2025021067a9a8a70a3a1e0001427e9b.html
[5]: https://socialfuturo.es/2025/02/16/el-lado-mas-oscuro-del-bloqueo-dinamico-la-liga-internet/
[6]: https://marketing4ecommerce.net/bloqueo-dinamico-laliga-perjuicios-empresas/
[7]: https://www.europapress.es/epsocial/ong-y-asociaciones/noticia-rooted-con-recurre-tc-bloqueo-dinamico-la-liga-20250217162048.html
[8]: https://www.europapress.es/epsocial/politica/noticia-congreso-rechaza-propuesta-limitar-bloqueo-dinamico-la-liga-20250220145555.html