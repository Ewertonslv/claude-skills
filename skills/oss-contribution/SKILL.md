---
name: oss-contribution
description: Fluxo de contribuicao em repos open-source externos (litellm, fastmcp, pydantic-ai, MCP sdk/servers e projetos Python/LLM-infra). Da suporte a PRs proprios ja abertos (triar review/CI, corrigir, responder/resolver threads) e descobre/abre novos PRs em issues nao reclamadas com teste before/after. Use quando o usuario pedir pra checar os PRs dele, endereçar um review, corrigir o CI de uma branch, achar uma issue ou abrir um PR num repo externo. NAO usar em repos da Viggo.
user_invocable: true
argument-hint: "[support|discover] [repo]"
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
  - TodoWrite
  - Write
  - Edit
---

# OSS Contribution — suporte + descoberta de PRs com disciplina senior

Contribuicao open-source na conta GitHub `Ewertonslv`, autorando como **Ewerton Silva**. Dois modos: **support** (cuidar dos PRs ja abertos) e **discover** (achar e abrir novos). Repos validos em `config/targets.md`.

> **Portfolio pessoal — NUNCA tocar repo/squad/Brain da Viggo.** Nunca abrir PR sem prova RED->GREEN (before-after-proof.md).

## Politica de confirmacao (DURA)

Toda **acao publica** — abrir/converter PR, comentar, resolver thread, push, pedir assignment — monta o comando `gh`/`git` exato **+ o texto completo**, MOSTRA e ESPERA o OK. Autonomo so no local (explorar, testes/typecheck, `git stash`, fork/clone, ler estado).

## Escolha do modo

- `support [repo]` -> `workflows/support-pr.md`.
- `discover [repo]` -> `workflows/discover-issue.md`.

Sem argumento: pergunte. Crie um TodoWrite com os passos do workflow.

## Gates universais (ambos os modos)

Leia a reference quando o gate disparar:

- **anti-duplicate.md** — 3 buscas + re-check imediato antes de abrir.
- **delivery-quality.md** — entender-primeiro, TDD, cobrir tudo que mudou, gates padrao, convencoes do repo, auto-review.
- **before-after-proof.md** — sem teste falha->passa, nao ha PR (vira comentario).
- **blast-radius.md** — tipo/union compartilhada: cace consumidores exaustivos + suite/typecheck.
- **security-self-review.md** — abriu forward/param? O que mais flui por ele?
- **draft-and-ask.md** — fallout semantico: DRAFT + pergunta; nunca force CI verde.
- **authoring-hygiene.md** — fork/branch off upstream, Conv Commits, identidade, SEM trailer Claude.
- **repo-rules.md** — regras por repo (ex.: fastmcp exige assignment ANTES).
- **env-tooling.md** — gotchas Windows/PowerShell/gh/jq/UTF-8/uv/ruff/pyright.

**REQUIRED SUB-SKILLS** (use as superpowers, nao reinvente): systematic-debugging, test-driven-development, requesting-code-review, verification-before-completion.

## Quick Reference

| Preciso | Comando |
|---|---|
| Listar meus PRs | `gh pr list --author Ewertonslv --state open` (ou `gh search prs --author Ewertonslv`) |
| Dup por numero | `gh pr list --repo OWNER/REPO --state open --search "<num>"` |
| Dup por titulo | `gh pr list --repo OWNER/REPO --state all --search "<keywords>"` |
| Claim fastmcp | comentar na issue pedindo assignment ANTES do PR |
| Prova RED->GREEN | escreve teste -> `git stash` -> falha -> `git stash pop` -> passa |
| Pre-existente vs meu | checkout `upstream/main` limpo e comparar |
| Resolver thread | GraphQL `resolveReviewThread` (ver review-response.md) |

## Red Flags — PARE e corrija o curso

| Se voce se pegar pensando... | PARE e em vez disso... |
|---|---|
| "E um fix de uma linha, manda" | Rode o sweep de blast-radius; one-liner em union compartilhado quebra exaustividade. |
| "Teste e dificil, o fix e obvio" | Sem RED->GREEN => comentario diagnostico, nao PR fraco. |
| "So regenerar os snapshots p/ ficar verde" | Mudanca semantica => DRAFT + perguntar ao maintainer. |
| "CI lint/budget vermelho, meu codigo ta errado" | Cheque staleness da branch primeiro; merge da base. |
| "A issue ta livre, abre o PR" | RE-CHECK agora: busca por keyword de titulo + assignees. |
| "O bot sugeriu o fix, cola" | Escreva seu PROPRIO body + adicione o teste que falta. |
| "Encaminhar esse param e inofensivo" | Pergunte o que mais flui por ele (routing-control bypass). |
| "Adicionar Co-Authored-By Claude" | NAO. Autora so como Ewerton Silva. |
