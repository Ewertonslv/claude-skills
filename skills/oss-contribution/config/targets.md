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
| NVIDIA/garak | sim | nao* (*bug PR: issue assigned/`bug-verified` OU teste confirmando) | nao | pip+flit (`pip install -e ".[tests]"`) | `python -m pytest tests/` | `black --config pyproject.toml <files>` + `pylint -v garak` |
| 567-labs/instructor | sim | nao | nao | uv (`uv pip install -e ".[dev,docs,test-docs]"`) | `uv run pytest tests/` (offline: `-k "not llm and not openai"`) | `uv run ruff check` + `uv run ty check` (Astral **ty**, nao mypy/pyright) |
| simonw/llm | sim | nao | nao (dependabot) | uv (`uv run ...`) ou `pip install . --group dev` | `python -m pytest -vv` | black + mypy + ruff + **cog** (`just cog`) |
| dottxt-ai/outlines | sim | nao (feature exige issue previa) | **SIM** (`octo-patch` auto-PR de fixes) | pip/uv (`pip install -e ".[test]"` + `pre-commit install`) | `pytest` (CI `-m "not api_call"`; baixa modelos) | pre-commit (ruff + mypy); **gate de 100% coverage** |
| traceloop/openllmetry | sim | nao (soft: comentar na issue) | nao (dependabot) | uv + Nx monorepo (`npm ci` + `npx nx ...`) | `npx nx run <pkg>:test` (= `uv run pytest tests/`) | `npx nx affected -t lint` (ruff) + `-t type-check` |
| IBM/mcp-context-forge | sim | nao (mas issue NAO pode ter label `triage`) | nao | uv (`uv venv` + `uv pip install -e .`; grupo `dev` **quebra no Windows** por `pytype`/VS — instalar `pytest pytest-asyncio pytest-env pytest-httpx ruff` avulso) | `uv run --no-sync pytest <path>` | ruff + pylint + black (pytype so em Linux/CI) |

## Legenda

- **aceita_pr_externo**: se PR de fora e aceito direto.
- **exige_assignment**: se a issue precisa estar atribuida a voce ANTES do PR (senao bot fecha). Ver repo-rules.md.
- **bot_auto_pr**: se ha bot que auto-abre PRs/issues — re-check anti-duplicate e critico aqui.
- **test/typecheck**: comando local pra validar. Em pydantic-ai, rodar typecheck completo ANTES do push (lint do CI = pyright; `ruff` local nao pega exaustividade).
- **CLA/DCO** (nao cabe na tabela; ver repo-rules.md): **garak** exige DCO (`git commit -s` em TODO commit) + assinar CA/DCO no 1o PR; **IBM/mcp-context-forge** exige DCO (`git commit -s` em TODO commit; `Signed-off-by` deve casar com o autor); **openllmetry** exige assinar CLA (bot CLAassistant) no 1o PR. Os demais alvos: nenhum.

## Forks ja existentes (clones locais)

- `C:\Users\Ewerton\Documents\Projetos github\litellm` (venv em `.venv`)
- `C:\Users\Ewerton\Documents\Projetos github\fastmcp`
- `C:\Users\Ewerton\Documents\Projetos github\pydantic-ai`
- `C:\Users\Ewerton\Documents\Projetos github\python-sdk`
- `C:\Users\Ewerton\Documents\Projetos github\mcp-context-forge` (venv `.venv`; fork `Ewertonslv/mcp-context-forge`)

Reusar esses clones; sincronizar com `git fetch upstream main` antes de criar branch.

Alvos novos (garak, instructor, simonw/llm, outlines, openllmetry) **ainda sem clone local** —
no primeiro discover, fazer fork + `git clone --filter=blob:none` (ver authoring-hygiene.md) e
adicionar o path aqui.
