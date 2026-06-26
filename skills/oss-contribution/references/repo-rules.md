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
