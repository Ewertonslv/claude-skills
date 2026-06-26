# claude-skills

A small collection of [Claude Code](https://claude.com/claude-code) **skills** I build to
systematize senior-engineering workflows — turning hard-won, repeatable process knowledge into
reusable, testable automation.

A "skill" here is a structured prompt-package (a `SKILL.md` plus reference files) that the agent
loads on demand. The interesting part isn't the format — it's encoding the *judgment* that
separates careful engineering from bulldozing.

## Skills

### `oss-contribution`

A disciplined workflow for contributing to **external open-source repositories** (litellm,
fastmcp, pydantic-ai, the MCP Python SDK, and similar Python/LLM-infra projects). Two modes:

- **`support`** — triage and advance my own open PRs: classify incoming review/CI feedback, tell
  branch-staleness apart from real failures, fix, respond to and resolve review threads.
- **`discover`** — find an *unclaimed*, tractable issue, vet it, fix it with a regression test that
  proves the bug, and open a clean PR following each repo's conventions.

It exists because I kept relearning the same expensive lessons by hand. The skill encodes them as
hard gates:

| Gate | The lesson behind it |
|---|---|
| **Anti-duplicate** | Got preempted 3× by not searching for an existing PR — including PRs that fix an issue without citing its number. Search by number *and* title keywords, and re-check right before opening. |
| **Before/after proof** | A fix without a test that *fails then passes* (`git stash` the fix → red → restore → green) isn't a PR. No reproducible test ⇒ post a diagnostic comment instead of a weak PR. |
| **Blast-radius** | A "one-line" change to a shared type/union breaks exhaustiveness (`assert_never`) and reclassifies values in consumers far away. Run the repo's *full* typecheck + suite, not just a linter and one test; separate pre-existing failures from your own. |
| **Security self-review** | When you "open" a forwarded parameter, ask what *else* can flow through it. (A real review caught a routing-control bypass this way.) |
| **Draft-and-ask** | If the obvious fix has semantic fallout, don't regenerate snapshots to force CI green — convert the PR to draft and ask the maintainer a design question. |
| **Authoring hygiene** | Fork + blobless clone, branch off fresh `upstream/main`, Conventional Commits, correct identity, commit only intended files. |

Every **public action** (opening a PR, commenting, resolving a thread, pushing) is gated behind an
explicit confirmation — the agent drafts the exact command and full text, shows it, and waits.

```
skills/oss-contribution/
├─ SKILL.md            # lean entry point: modes, confirm policy, quick reference, red flags
├─ config/targets.md   # editable per-repo rules (accepts external PRs? needs assignment? test cmd)
├─ workflows/          # the two gated mode flows (support / discover)
└─ references/         # the deep how-to for each gate
```

## Why this repo exists

I'm a backend engineer ([Viggo Sistemas](https://github.com/Ewertonslv), Delphi + PostgreSQL, 4+
years) building toward remote work. These skills are how I make my own process repeatable and
inspectable — the discipline is the product.

## License

MIT
