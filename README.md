# claude-skills

A collection of [Claude Code](https://claude.com/claude-code) **skills** — structured
prompt-packages (a `SKILL.md` plus reference files) the agent loads on demand — that
systematize repeatable workflows. Some are mine; others are curated open-source skills I
vendor and rely on. The interesting part isn't the format — it's encoding the *judgment*
that separates careful work from bulldozing.

> **Layout:** my own skills live in [`skills/`](skills/) (`landing-monopage`,
> `oss-contribution`); everything else is vendored third-party under
> [`external/`](external/), each under its own upstream license. The tables below index the
> whole toolchain by category; the **Origin** column and
> [Licensing & attribution](#licensing--attribution) say what is mine and what is vendored.

## Skills by category

### 🖥️ Client sites & design
| Skill | What it does | Origin |
|---|---|---|
| `landing-monopage` | Create a freelance one-page site for a local business (dentist, lawyer, salon, clinic…), generate the commercial quote, and publish (Netlify/Hetzner). | **mine** · MIT |
| `impeccable` | Design, audit and polish a frontend UI — visual hierarchy, accessibility, typography, motion, edge/empty states, reusable design tokens. | vendored · Apache-2.0 |

### 🔎 Prospecting & outreach
| Skill | What it does | Origin |
|---|---|---|
| `prospecting` | Find, qualify and build a target list of prospects (B2B SaaS, general B2B, local businesses without a website). | vendored · MIT |
| `cold-email` | Write B2B cold outreach and multi-touch follow-up sequences that get replies. | vendored · MIT |

### ✍️ Copy & offer
| Skill | What it does | Origin |
|---|---|---|
| `copywriting` | Write/rewrite marketing-page copy (hero, landing, pricing, features) that persuades and converts. | vendored · MIT |
| `ad-creative` | Generate and iterate ad copy at scale — headlines, primary text, RSA variations, creative testing. | vendored · MIT |
| `offers` | Design the offer itself — value stack, bonuses, guarantees, scarcity, naming, payment structure. | vendored · MIT |

### 📈 Traffic, conversion & measurement
| Skill | What it does | Origin |
|---|---|---|
| `ads` | Paid-campaign strategy across Google/Meta/LinkedIn — targeting, bidding, ROAS/CPA optimization. | vendored · MIT |
| `cro` | Conversion-rate optimization for pages and forms — diagnose why a page isn't converting and fix it. | vendored · MIT |
| `analytics` | Set up and audit tracking/measurement (GA4, GTM, events, UTMs, attribution). | vendored · MIT |

### 🛠️ Development & OSS
| Skill | What it does | Origin |
|---|---|---|
| `oss-contribution` | Disciplined workflow to advance/open PRs in external OSS repos (litellm, fastmcp, pydantic-ai, MCP SDK) with hard gates: anti-duplicate, before/after proof, blast-radius, security self-review, draft-and-ask. | **mine** · MIT |

## Highlight — `oss-contribution`

My own skill, born from re-learning the same expensive lessons by hand. Two modes:

- **`support`** — triage and advance my own open PRs: classify review/CI feedback, tell
  branch-staleness from real failures, fix, and resolve review threads.
- **`discover`** — find an *unclaimed*, tractable issue, vet it, fix it with a regression
  test that proves the bug, and open a clean PR following each repo's conventions.

Every **public action** (opening a PR, commenting, pushing) is gated behind an explicit
confirmation — the agent drafts the exact command and text, shows it, and waits.

## Why this repo exists

I'm a backend engineer ([Viggo Sistemas](https://github.com/Ewertonslv), Delphi +
PostgreSQL, 4+ years) building toward remote work. `landing-monopage` and `oss-contribution`
are how I make my own process repeatable and inspectable — the discipline is the product.
The vendored skills are here so the toolchain travels with me in one place.

## Licensing & attribution

Own work and vendored skills are kept in separate trees:

- **[`skills/`](skills/) — my own, MIT:** `landing-monopage`, `oss-contribution`.
- **[`external/`](external/) — vendored third-party, each under its own license** (see
  [`external/README.md`](external/README.md)):
  - `external/marketingskills/` — MIT, from [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) (`ads`, `ad-creative`, `analytics`, `cold-email`, `copywriting`, `cro`, `offers`, `prospecting`).
  - `external/impeccable/` — Apache-2.0.
  - `external/anthropic-skills/` — Apache-2.0, from [`anthropics/skills`](https://github.com/anthropics/skills) (`mcp-builder`, `skill-creator`, `webapp-testing`, `frontend-design`); each keeps its `LICENSE.txt`.

The MIT `LICENSE` in this repo applies **only to my own skills under `skills/`**.
