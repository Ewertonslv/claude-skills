# external/anthropic-skills

**Third-party skills — not authored by me.** These are vendored, unmodified, from
Anthropic's official [`anthropics/skills`](https://github.com/anthropics/skills)
repository, and are all **Apache-2.0** licensed — each folder retains its original
`LICENSE.txt`.

They are also installed under `~/.claude/skills/` so Claude Code loads them on demand.

## Vendored skills (Apache-2.0)

| Skill | What it does |
|---|---|
| `mcp-builder` | Build high-quality MCP servers (tools/resources design, Python/TS). |
| `skill-creator` | Create, improve, and evaluate Claude Code skills. |
| `webapp-testing` | Drive/test local web apps with Playwright (UI debugging, verification). |
| `frontend-design` | Guidance for distinctive, intentional frontend visual design. |

## Not included here (on purpose)

Anthropic's document skills (`pdf`, `docx`, `xlsx`, `pptx`) are **proprietary**
("All rights reserved") and their license forbids redistribution — so they are **not**
committed to this public repo. They are only installed locally under `~/.claude/skills/`
for personal use within Claude Code.

## Updating

Copied from `anthropics/skills` (shallow clone) on 2026-06-30. To refresh, re-copy the
folder from that upstream repo. My own skills live in `../../skills/`.
