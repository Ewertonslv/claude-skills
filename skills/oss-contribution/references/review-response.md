# Responder e resolver reviews

Para cada thread de review endereçado: responder citando o **SHA** do commit que corrige + o que
foi feito, e **resolver** o thread. Vale para reviewers humanos e bots (Greptile, CodeRabbit,
Codex, veria-ai).

## Responder inline num thread

Precisa do databaseId do primeiro comentario do thread. Pegar via GraphQL:

```graphql
query { repository(owner:"OWNER", name:"REPO") { pullRequest(number:N) {
  reviewThreads(first:30){ nodes { id isResolved comments(first:1){ nodes { databaseId author{login} } } } } } }
```
Depois:
```
gh api -X POST "repos/OWNER/REPO/pulls/N/comments/<databaseId>/replies" --input <reply.json>
```
`reply.json` = `{"body":"..."}` em UTF-8 **sem BOM** (env-tooling.md). Se a resposta inline falhar,
um comentario top-level (`gh pr comment`) tambem serve.

## Resolver o thread (GraphQL)

```graphql
mutation { resolveReviewThread(input:{threadId:"<PRRT_...>"}) { thread { isResolved } } }
```
```
gh api graphql --input <mutation.json>
```

## Conteudo da resposta

- Citar o SHA do fix e descrever objetivamente o que mudou.
- Se o reviewer pediu prova, re-rodar e colar o before/after real (nao inventar saida).
- Se for sugestao de **broadening** (estender a correcao), adotar e dizer explicitamente por que (alinhar ao padrao do codigo). Se for nitpick de cobertura, cobrir exatamente o que voce mudou.
- Se for **achado de seguranca**, tratar como tal: fix localizado + teste + resposta + resolve (security-self-review.md).

## Diagnostico de staleness (review/CI)

Aprovacao anterior pode ser **dispensada** quando voce da push (branch protection "dismiss stale reviews"). Isso e normal — nao e regressao; reporte que precisa de re-aprovacao. CI `lint`/`budget-ratchet` vermelho costuma ser branch desatualizada (support-pr.md passo 3), nao seu codigo.

## Honestidade

Nunca afirmar "resolvido/mergeado" sem checar o estado real via `gh pr view`. Reportar com fidelidade o que passou, o que falhou e o que depende do maintainer.
