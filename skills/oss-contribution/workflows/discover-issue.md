# Workflow: Discover (achar e abrir novo PR)

Objetivo: achar uma issue NAO reclamada, vet, corrigir com teste before/after, e abrir
um PR limpo. Cada acao publica passa pelo confirm-gate do SKILL.md.

Crie um TodoWrite com estes passos.

## 1. Escolher repo e levantar candidatos

- Repo(s) de `config/targets.md`. Se `discover` veio sem repo, pergunte ou varra os alvos.
- Listar issues abertas tractaveis:
  ```
  gh issue list --repo OWNER/REPO --state open --limit 40 --search "sort:created-desc label:bug" --json number,title,createdAt,labels,comments,assignees
  ```
  Tambem tentar `label:"help wanted"` / `label:"good first issue"`.
- **Opcional (>=3 repos):** recon paralelo via Explore agents (um por repo) so para montar a LISTA de candidatos. O resultado e candidato, NUNCA luz verde — o re-check do passo 11 e sempre sequencial e fresco.
- **Fonte extra: post-mortem de PR/issue fechado.** Seus PRs recem-fechados/rejeitados e issues de bot
  fechadas como "invalid" frequentemente escondem um bug adjacente real — OU confirmam que o maintainer
  estava certo. Protocolo:
  1. **Verifique LOCALMENTE** a justificativa do maintainer (o shape/claim que ele negou existe mesmo no
     codigo upstream?).
  2. Premissa cai -> **encerre o lead honestamente**, sem follow-up publico.
  3. Inconsistencia real e *diferente* -> vira candidato normal (segue pro passo 2: anti-duplicate + TDD).
  - Precedente: pydantic-ai #6048 fechado "Invalid" -> investigacao local confirmou o maintainer
    (adapters roteiam `NativeToolReturnPart` p/ ModelResponse via `MessagesBuilder.add`) e o pivot levou
    ao litellm #31594/#31601 (bug adjacente real em `cost_breakdown`).

## 2. Anti-duplicate gate (OBRIGATORIO antes de investir)

Siga `references/anti-duplicate.md` na integra para cada issue promissora. Em resumo:
- `gh pr list --repo OWNER/REPO --state open --search "<num>"` E `--state all --search "<keywords-do-titulo>"` (o PR que conserta as vezes NAO cita o numero).
- `gh issue view <num> --json assignees,closedByPullRequestsReferences,comments` — assignee ativo ou "Can I pick this up?"/"I'll take this" recente => PULAR.
- Descartar qualquer issue ja com PR aberto, assignee, ou vaga/grande demais.

## 3. Vet tractabilidade

- Bug real, reproduzivel, escopo S/M. Ler o corpo: tem repro? E bug ou pedido de feature vago/suporte?
- Preferir a area onde voce tem fit (pricing/model_info no litellm, schema/types no pydantic-ai/fastmcp, etc.).

## 4. Regra do repo (repo-rules.md)

- Checar `exige_assignment` em targets.md. Se **fastmcp** (ou similar): comentar na issue pedindo assignment ANTES de qualquer PR (confirm-gate) e PARAR ate ser atribuido — senao o bot fecha o PR com `missing-issue-link`.
- Demais (litellm, pydantic-ai, mcp): PR direto OK.

## 5. Preparar o worktree (authoring-hygiene.md)

- Reusar o fork/clone local de targets.md, ou `gh repo fork OWNER/REPO --clone=false` + `git clone --filter=blob:none`.
- `git remote add upstream https://github.com/OWNER/REPO.git`; `git fetch --filter=blob:none upstream <base>`.
- Branch off **fresco**: `git checkout -b <branch> upstream/<base>` (forks ficam atras).

## 6. Entender a fundo (antes de codar) — delivery-quality.md secao 1

REQUIRED SUB-SKILL se o bug nao e trivial: **superpowers:systematic-debugging**.
- Ler a discussao da issue: o maintainer pode ja indicar a abordagem preferida/restricoes — nao contrarie.
- Estudar a area (`git log -p`/`git blame`, PRs anteriores no mesmo modulo) pra achar a causa-raiz e espelhar o idioma do codebase.
- Reproduzir o bug (confirmar que existe). Se ha escolha de abordagem com trade-offs -> superpowers:brainstorming.

## 7. Teste-primeiro (TDD) + fix minimo — delivery-quality.md secoes 2-3

REQUIRED SUB-SKILL: **superpowers:test-driven-development**.
- Escreva o teste que captura o bug **primeiro**; rode e veja FALHAR pela razao certa.
- Escreva o fix minimo e idiomatico; rode e veja PASSAR.
- Cubra **tudo que voce mudou** (todos os membros/ramos/casos) + edge cases — nao so o caminho feliz.

## 8. No-weak-PR gate (before-after-proof.md)

Confirme o RED->GREEN (a prova do passo 7):
```
git stash push -- <arquivo(s) do fix>   # remove SO o fix, mantem o teste
<rodar o teste>                           # ESPERA FALHAR
git stash pop                             # restaura o fix
<rodar o teste>                           # ESPERA PASSAR
```
- **Passou mesmo sem o fix?** O teste NAO prova o bug -> NAO submeter PR. Poste um **comentario diagnostico** de alta qualidade (causa-raiz com file:linha, por que nao e testavel, forma do fix). Encerrar.

## 9. Gates de qualidade + blast-radius + seguranca — delivery-quality.md secao 4

SEMPRE, nao so quando algo dispara:
- **Suite afetada completa** + **`ruff check`/`format`** + **typecheck** (targets.md; em pydantic-ai `make typecheck-pyright`). Separe falha pre-existente (checkout `upstream/main`) de culpa sua.
- Mexeu em tipo/union/assinatura compartilhada? -> **blast-radius.md** (cace `assert_never`, isinstance-chains, builders).
- "Abriu" um forward/param? -> **security-self-review.md**.
- Fallout semantico (exaustividade, churn de snapshot por mudanca de comportamento)? -> **draft-and-ask.md**, nunca force verde.

## 10. Convencoes + auto-review — delivery-quality.md secoes 5-6

- `CONTRIBUTING.md` + PR template; **CHANGELOG/news fragment** se o repo exige; **DCO** (`git commit -s`) se exige; escopo unico (1 issue).
- Auto-review do proprio `git diff` (REQUIRED SUB-SKILL: **superpowers:requesting-code-review**, ou `/simplify`): diff minimo? sem debug morto? reusa utilitario existente? `git status --short` so com os arquivos pretendidos?

## 11. RE-CHECK anti-duplicate + abrir o PR (confirm-gate)

- **RE-CHECK anti-duplicate AGORA** (repita o passo 2) — issues populares ganham PR em horas, bots auto-abrem. Surgiu PR/assignee? Pare e reporte.
- Body PROPRIO (nao colar sugestao de bot verbatim): summary, root-cause, fix, teste before/after, "Closes #<num>".
- Conventional Commits; autor `Ewerton Silva <ewertoncom297@gmail.com>`; SEM trailer Claude.
- Montar `gh pr create ...` + body completo, MOSTRAR, esperar OK. REQUIRED SUB-SKILL: **superpowers:verification-before-completion** (nao afirmar "pronto" sem evidencia real).
- Pos-abertura: acompanhar via modo `support`.
