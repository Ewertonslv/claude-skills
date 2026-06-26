# Anti-duplicate (nao seja preemptado)

Ja fomos preemptados 3x por nao checar PR existente: pydantic-ai #5994 (duplicata de #5936),
fastmcp #4306 (ja tinha #4312 aberto 2 dias antes), litellm #29998 (ja tinha #29997). Comentario
de analise sem PR NAO conta — codigo no PR conta, e quem abre primeiro leva.

## As 3 buscas (antes de investir)

1. **PR por numero da issue:**
   ```
   gh pr list --repo OWNER/REPO --state open --search "<num>"
   ```
2. **PR por keyword do TITULO** (o PR que conserta frequentemente NAO cita o numero da issue):
   ```
   gh pr list --repo OWNER/REPO --state all --search "<2-4 palavras do tema>"
   ```
   Ex.: issue "cache_creation TTL" -> buscar tambem "cache creation usage". Foi assim que o #29997 escapou de uma busca so por keyword exata.
3. **Assignee + sinais de claim:**
   ```
   gh issue view <num> --repo OWNER/REPO --json assignees,closedByPullRequestsReferences,comments
   ```
   Procurar assignee ativo e comentarios "Can I pick this up?" / "I'll take this" / "working on it".

## Regra de decisao

- PR aberto referenciando a issue (por numero OU titulo) -> **PULAR**.
- Assignee ativo, ou claim recente (< ~2 semanas) com PR -> PULAR.
- Claim antigo (> ~3-4 semanas) SEM PR e SEM assignment -> soft-claim morto; pode prosseguir, mas deixe um comentario cortes ("opening a PR since this has been open a while — happy to defer").

## RE-CHECK obrigatorio

Repita a busca #1 e #2 **imediatamente antes de abrir o PR**. Issues populares ganham PR em horas; repos com bot (pydantic `pydanty`) auto-abrem PR a qualquer momento. Resultado de recon paralelo e candidato, nunca luz verde.

## Parsing no Windows

Sempre parse com `ConvertFrom-Json` (o `jq` inline com `\(...)` quebra no PowerShell — ver env-tooling.md). Conte `($obj | Measure-Object).Count`; objeto unico tem `.Count` nulo.
