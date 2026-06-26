# Repos-alvo

Lista editavel de repositorios para os modos `support` e `discover`. Edite esta tabela
para adicionar/remover alvos — NAO mexa no SKILL.md. A narrativa e os edge-cases de cada
repo ficam em `references/repo-rules.md`.

Identidade: GitHub `Ewertonslv`, autor de commit `Ewerton Silva <ewertoncom297@gmail.com>`.

## Tabela

| repo | aceita_pr_externo | exige_assignment | bot_auto_pr | gerente_pacote | test | typecheck |
|---|---|---|---|---|---|---|
| BerriAI/litellm | sim | nao | nao | pip (venv `-e .[proxy]`) | `python -m pytest <path>` ou `uv run pytest <path>` | — |
| PrefectHQ/fastmcp | sim | **SIM** (label `missing-issue-link`) | nao | uv | `uv run pytest <path>` | — |
| pydantic/pydantic-ai | sim | nao | **SIM** (`pydanty` auto-file + auto-PR) | uv | `uv run pytest <path>` | `make typecheck-pyright` (lint roda pyright) |
| modelcontextprotocol/python-sdk | sim | nao | nao | uv | `uv run pytest <path>` | — |
| modelcontextprotocol/servers | sim | nao | nao | npm/uv | conforme server | — |

## Legenda

- **aceita_pr_externo**: se PR de fora e aceito direto.
- **exige_assignment**: se a issue precisa estar atribuida a voce ANTES do PR (senao bot fecha). Ver repo-rules.md.
- **bot_auto_pr**: se ha bot que auto-abre PRs/issues — re-check anti-duplicate e critico aqui.
- **test/typecheck**: comando local pra validar. Em pydantic-ai, rodar typecheck completo ANTES do push (lint do CI = pyright; `ruff` local nao pega exaustividade).

## Forks ja existentes (clones locais)

- `C:\Users\Ewerton\Documents\Projetos github\litellm` (venv em `.venv`)
- `C:\Users\Ewerton\Documents\Projetos github\fastmcp`
- `C:\Users\Ewerton\Documents\Projetos github\pydantic-ai`
- `C:\Users\Ewerton\Documents\Projetos github\python-sdk`

Reusar esses clones; sincronizar com `git fetch upstream main` antes de criar branch.
