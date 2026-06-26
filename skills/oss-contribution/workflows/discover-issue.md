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
- **Opcional (>=3 repos):** recon paralelo via Explore agents (um por repo) so para montar a LISTA de candidatos. O resultado e candidato, NUNCA luz verde — o re-check do passo 9 e sempre sequencial e fresco.

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

## 6. Reproduzir + corrigir + testar

- Reproduzir o bug primeiro (confirmar que existe).
- Aplicar o fix minimo e idiomatico (estilo do codigo ao redor).
- Escrever o teste de regressao.

## 7. No-weak-PR gate (before-after-proof.md)

```
git stash push -- <arquivo(s) do fix>   # remove SO o fix, mantem o teste
<rodar o teste novo>                      # ESPERA FALHAR
git stash pop                             # restaura o fix
<rodar o teste novo>                      # ESPERA PASSAR
```
- Falhou sem o fix e passou com o fix? OK, segue.
- **Passou mesmo sem o fix?** O teste NAO prova o bug -> NAO submeter PR. Em vez disso poste um **comentario diagnostico** de alta qualidade (sintomas, hipotese de causa-raiz, por que nao e unit-testavel, especificidades de ambiente). Encerrar.

## 8. Blast-radius + seguranca + suite completa

- Mexeu em tipo/union/assinatura compartilhada? -> blast-radius.md (cace `assert_never`, isinstance-chains, builders; rode typecheck + suite completos; compare com `upstream/main` limpo pra separar pre-existente de culpa sua).
- "Abriu" um forward/param? -> security-self-review.md.
- Rodar test + typecheck do repo (targets.md). `ruff check`/`format` limpos.

## 9. RE-CHECK anti-duplicate (imediatamente antes de abrir)

Repita o passo 2 AGORA — issues populares ganham PR em horas, e bots auto-abrem. Se surgiu PR/assignee, pare e reporte.

## 10. Abrir o PR (confirm-gate)

- Body PROPRIO (nao colar a sugestao do bot verbatim), com: summary, root-cause, fix, teste before/after, "Closes #<num>".
- Conventional Commits; autor `Ewerton Silva <ewertoncom297@gmail.com>`; SEM trailer Claude; `git add` so dos arquivos pretendidos.
- Montar `gh pr create ...` + body completo, MOSTRAR, esperar OK.
- Pos-abertura: acompanhar via modo `support`.
