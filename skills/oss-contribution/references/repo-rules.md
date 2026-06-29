# Regras por repo (narrativa + edge-cases)

Flags resumidos em `config/targets.md`. Aqui a narrativa e os edge-cases. Adicione repos novos
conforme aprende a regra deles (atualize tambem a tabela).

## PrefectHQ/fastmcp — assignment ANTES do PR

Politica (CONTRIBUTING.md): um PR externo so e aceito se referencia uma issue **atribuida ao autor**.
Caso contrario um GitHub Action **fecha o PR automaticamente** com a label `missing-issue-link`.

Fluxo correto:
1. Comentar na issue pedindo assignment (confirm-gate). Ex.: "I'd like to take this one — could a maintainer assign it to me so the PR can proceed?" + resumo da abordagem.
2. Esperar o maintainer atribuir. So entao abrir o PR — ele reabre/passa o check assim que a issue esta atribuida.
- Codigo do fastmcp v3 fica em `fastmcp_slim/fastmcp/...`; testes em `tests/`.

## pydantic/pydantic-ai — bot auto-PR, CI rigoroso

- Roda um bot (`pydanty`) que **auto-arquiva issues** (ex.: tag `[roundtrip-sweep]`) e **auto-abre PRs de fix**. Issues com corpo "fix de uma linha + teste pronto" sao saida de bot — re-check anti-duplicate e CRITICO (o bot pode abrir PR a qualquer momento) e a originalidade do seu PR e baixa se so colar.
- **CI tem pyright** (job `lint` -> `make typecheck-pyright`) e roda a suite completa em varias versoes Python. `ruff` local NAO pega quebra de exaustividade. SEMPRE rodar `make typecheck-pyright` + suite afetada ANTES do push (ver blast-radius.md).
- Codigo em `pydantic_ai_slim/pydantic_ai/...`; testes em `tests/`. Usa inline-snapshot (`filterwarnings=["error"]` faz warning de serializer virar erro).
- PR externo aceito direto (sem assignment).

## BerriAI/litellm — alta velocidade, pricing/model_info no nosso fit

- Issues ganham PR em horas; re-check sempre. PR externo direto.
- Setup de proxy local pesado (Prisma + Postgres). Para teste de unidade, `python -m pytest <path>` no venv basta; nao precisa subir o proxy.
- Boot do proxy: setar `DISABLE_SCHEMA_UPDATE=true` (pula ~15min de resolve de migrations) e `PYTHONIOENCODING=utf-8` (senao o banner crasha com `UnicodeEncodeError` no Windows).
- Branch base costuma ser `litellm_internal_staging` / `litellm_oss_staging` (nao `main`) — confira `baseRefName` do PR.

## modelcontextprotocol/python-sdk & servers

- PR externo direto. Issues ganham PR em 1-3 dias. python-sdk usa uv; bugs de concorrencia/lifecycle (ex.: socket leak) costumam NAO ser unit-testaveis -> before-after-proof.md (comentario diagnostico em vez de PR fraco).

## NVIDIA/garak — DCO obrigatorio + AGENTS.md vinculante (LLM security)

Scanner de vulnerabilidades de LLM. Ponte LLM-infra + AppSec. PR externo direto, base `main`,
pip+flit (`pip install -e ".[tests]"`), `python -m pytest tests/`, format `black --config pyproject.toml`,
lint `pylint -v garak`. Python >=3.10; CI roda Linux x86+ARM, macOS, Windows.

Regras DURAS (CONTRIBUTING.md + `CA_DCO.md` + `AGENTS.md` — o AGENTS.md diz que violar pode dar ban):
- **DCO: `git commit -s` em TODO commit** (`Signed-off-by:`). Commit sem sign-off NAO e aceito (status-check `DCO`).
  Assinar o CA/DCO no 1o PR (bot comenta).
- **Nada de PR "puro de agente":** um humano entende e defende cada linha e roda os testes. A descricao do PR
  **deve disclosar** que houve assistencia de IA + por que nao duplica PR existente + os comandos de teste rodados e o resultado.
- **Bug PR:** so pegar issue `bug-verified` ou atribuida; senao, **shippar um teste que confirma o bug** (casa com before-after-proof.md).
- **Sem numero de issue no titulo** do PR (ok na descricao). Sem PR de typo/estilo isolado. Sem dependencia nova. PR coeso (so arquivos do tema).
- Codigo em `garak/` (probes/detectors/generators/buffs); teste de `garak.probes.xyz` vai em arquivo novo `tests/probes/test_probe_xyz.py`. Docstrings cobertas por `tests/test_docs.py`.
- **Vuln responsavel:** falha de seguranca vai pra security@garak.ai, NUNCA no tracker publico.
- **Tensao com a regra anti-trailer-Claude:** garak *encoraja* `Co-authored-by:` pra IA, mas nossa regra DURA e
  NAO adicionar trailer Claude (authoring-hygiene.md). Resolva disclosando a IA **na prosa da descricao do PR**
  (que e o que o garak realmente exige), sem o trailer git. O `Signed-off-by:` do Ewerton continua obrigatorio.

## 567-labs/instructor — structured outputs em cima do Pydantic

Remote canonico = `instructor-ai/instructor` (`567-labs/`, `jxnl/` redirecionam). PR externo direto, base `main`,
sem CLA/DCO. Maior fit do nosso perfil pydantic.
- uv: `uv pip install -e ".[dev,docs,test-docs]"` + `pre-commit install`. Teste: `uv run pytest tests/`
  (offline/rapido: `-k "not llm and not openai"`; testes por provider em `tests/llm/test_<provider>/` exigem API key e sao auto-skipados sem ela).
- Lint/types: `uv run ruff check` + `uv run ruff format --check` + **`uv run ty check`** (type checker `ty` da Astral, pinado; **nao** mypy/pyright). Type-check tambem roda em Python 3.9 e 3.14 -> evitar sintaxe so-de-versao-nova.
- **Conventional Commits no commit E no titulo do PR** (`feat:`/`fix:`/`docs:`, scope tipo `fix(anthropic):`).
- **Docs sao testados** (`pytest-examples`/`test_docs.yml`): exemplos de codigo nas docs precisam rodar. Doc nova precisa entrar no `mkdocs.yml`.
- Adicionar provider e processo de 7 passos (deps em 2 lugares + client + MODE + enum `Provider` + `get_provider` + `process_response.py` + testes). Codigo em `instructor/`, testes em `tests/`.

## simonw/llm — Simon Willison, gate de lint completo, ecossistema de plugins

CLI/lib de LLM. Mantenedor super receptivo e de alto alcance (networking/visibilidade). PR externo direto, base `main`, sem CLA/DCO.
- uv (`uv run pytest`) ou espelhar CI com `pip install . --group dev`. **Atencao:** o `AGENTS.md` esta stale (manda `pip install -e '.[test]'`, mas o extra `[test]` NAO existe) — confie no `docs/contributing.md` (uv).
- Teste: `python -m pytest -vv`. **Gate de lint completo no CI (todos precisam passar):** `black --check .` + `mypy llm` + `ruff check .` + `cog --check` (Cog valida que os exemplos de `--help` nas docs estao regenerados — rode `just cog` se mexer em comportamento de CLI). `just` e necessario pro fluxo de docs.
- Tests de API usam cassettes (pytest-recording) + snapshots (syrupy). CI matrix largo: Python 3.10-3.14, Ubuntu/macOS/Windows.
- **Caminho alternativo de 1a classe: plugin standalone `llm-*`.** Em vez de PR no core, da pra publicar um pacote proprio que registra via entry point (`pluggy`); `docs/plugins/tutorial-model-plugin.md` ensina do zero. Otimo como peca de portfolio (sem cookiecutter; setup manual). Codigo em `llm/`, testes em `tests/`.

## dottxt-ai/outlines — geracao estruturada, gate de 100% coverage

Constrained/structured generation. PR externo direto, base `main` (aceita tambem `v1.0`), sem CLA/DCO.
- pip ou uv: `pip install -e ".[test]"` + **`pre-commit install` (obrigatorio)**. Teste: `pytest`
  (CI roda `-m "not api_call"` pra pular chamadas reais de provider). **Testes baixam modelos** (Ollama `tinyllama`, HuggingFace) — rodar offline exige cache.
- Lint/types via **pre-commit** (`pre-commit run --all-files`): ruff + mypy. CI hard-fail no estilo.
- **GATE DE 100% COVERAGE** (`--fail-under=100`): codigo novo precisa estar 100% testado ou o CI quebra. Planeje o teste junto do fix.
- **Feature nova exige issue previa** (PR template). Bot **`octo-patch`** auto-abre PRs de fix -> re-check anti-duplicate atento. PR rebaseado no `main`, 1 commit por mudanca logica, docstrings numpydoc. Codigo em `outlines/`, testes em `tests/`. Tracker so pra item acionavel (resto -> Discussions).

## traceloop/openllmetry — observability LLM, monorepo Nx+uv, CLA + conventional PR title

OpenTelemetry pra LLM. Adjacente ao trabalho de cost/usage do litellm. PR externo direto, base `main`.
- **Monorepo Nx + uv** (fricao media): precisa de Node E uv. Setup: `npm ci` (raiz, instala Nx) + `npx nx affected -t install` (= `uv sync`). Teste por pacote: `npx nx run <pkg>:test` (= `uv run pytest tests/` no dir do pacote) ou `npx nx affected -t test`. Lint `npx nx affected -t lint` (ruff) + `-t type-check`. NAO rode pytest global — use `nx affected`.
- **CLA obrigatorio** (bot CLAassistant, assinar no 1o PR). Sem DCO.
- **Titulo do PR em Conventional Commits e enforced no CI** (`action-semantic-pull-request`): `feat(instrumentation): ...`, `fix(openai): ...`. Sem changelog manual (commitizen gera no release).
- PR template: adicionar testes; pra instrumentacao nova/alterada, **anexar screenshots** de uma plataforma de observability. Versionamento centralizado em `.cz.toml` — nao editar versao na mao. Tests usam cassettes VCR. Pacotes em `packages/<nome>/` (~35; ha `opentelemetry-instrumentation-litellm` e `...-mcp`).
