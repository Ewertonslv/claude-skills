# Workflow: Support (cuidar dos PRs proprios)

Objetivo: triar e avancar os PRs/issues ja abertos com disciplina senior. Cada acao
publica passa pelo confirm-gate do SKILL.md.

Crie um TodoWrite com estes passos. Trabalhe um PR por vez.

## 1. Enumerar

```
gh search prs --author Ewertonslv --json number,title,repository,state,url
```
Para cada PR aberto/relevante, pegue o estado completo (parse com `ConvertFrom-Json`):
```
gh pr view <num> --repo OWNER/REPO --json state,mergedAt,reviewDecision,mergeStateStatus,statusCheckRollup,comments,reviews,updatedAt
```
Liste tambem issues onde voce comentou/abriu PR (ex.: fastmcp aguardando assignment).

## 2. Classificar o feedback de cada PR

Para cada um, identifique a classe (pode ter mais de uma):

- **CI falhando** -> passo 3.
- **Thread de review aberto** (humano ou bot: Greptile/CodeRabbit/Codex/veria-ai) -> passo 4.
- **Nitpick de bot** (ex.: "cobertura incompleta") -> passo 4, tratar como feedback valido.
- **Achado de seguranca** -> passo 4 + security-self-review.md.
- **Sinal positivo de bot** (Greptile "Confidence X/5 - Safe to merge"/"T-Rex verified", Codecov "all modified lines covered", veria-ai "no security concerns") -> NADA a fazer alem de registrar como verde. NAO responder/agradecer cada bot (vira ruido no PR); so reportar ao usuario e seguir.
- **Aprovado, aguardando merge** -> nada a fazer; reportar e seguir.
- **Fechado por bot** (ex.: `missing-issue-link`) -> repo-rules.md (pedir assignment).

## 3. Diagnosticar CI: staleness vs falha real

ANTES de editar codigo, descubra se a falha e do seu codigo ou de branch desatualizada:

1. Veja os jobs que falharam: `gh run view --repo OWNER/REPO --job <id> --log-failed`.
2. Sinais de **staleness** (NAO e seu codigo): `lint`/`budget-ratchet`/scripts de gate falhando com "unrecognized arguments", budgets "raised", workflow chamando flag que sua versao do script nao tem. Quantos commits atras: `git rev-list --left-right --count HEAD...upstream/<base>`.
   - Fix: `git fetch upstream <base>`; `git merge upstream/<base>` (ou rebase) na sua branch; re-rodar testes locais; push (confirm-gate).
3. Se for **falha real do seu codigo** -> corrija (passo 4) com before-after-proof.

Sempre confirme: a falha tambem ocorre na `upstream/main` limpa? (`git checkout upstream/main` e rode -> se falha igual, e pre-existente, nao sua.)

## 4. Corrigir / responder — delivery-quality.md

- **Entender primeiro** (REQUIRED SUB-SKILL se nao-trivial: superpowers:systematic-debugging): ler o thread/CI a fundo, achar a causa-raiz, espelhar o idioma do codebase.
- Aplique o fix **minimo e idiomatico**. Se mexer em **tipo/union/assinatura compartilhada** -> blast-radius.md. Se "abrir" um forward/param -> security-self-review.md.
- **Teste** com prova before-after-proof.md (RED->GREEN; ordem TDD — superpowers:test-driven-development). Se o feedback e "cobertura incompleta", cubra **tudo** que voce mudou (todos os membros/ramos), nao so um.
- **Gates padrao SEMPRE** (delivery-quality.md secao 4): suite afetada completa + `ruff check`/`format` + typecheck (em pydantic-ai `make typecheck-pyright`). Separe falha pre-existente (checkout `upstream/main`) de culpa sua.
- **Auto-review** do diff antes do push (superpowers:requesting-code-review / `/simplify`): minimo, sem debug morto, so arquivos pretendidos.
- Se o fix revelar **fallout semantico** (exaustividade quebrada, churn grande de snapshot, reclassificacao via builder) -> draft-and-ask.md: NAO force verde; converta pra DRAFT e pergunte a direcao ao maintainer (confirm-gate).

## 5. Responder e resolver threads

Para cada thread endereçado (review-response.md):
- Responder citando o **SHA** do commit que corrige + o que foi feito.
- **Resolver** o thread (GraphQL `resolveReviewThread`).
- Re-rodar e colar provas que o maintainer pediu (before/after).
- Cada reply/resolve/push = confirm-gate.

## 6. Nudge de cortesia (PR proprio parado)

Quando um PR seu esta **verde + sem thread aberto + aguardando review HUMANO ha > ~14 dias**:
opcionalmente UM ping curto e educado (confirm-gate). Regras:
- Maximo **1 nudge por PR a cada ~2 semanas**; nunca repetir/spammar.
- Nao @-marcar muita gente; se ja ha promessa de review, NAO pingar.
- Default e nao fazer — so ofereça ao usuario; ele decide.

Template:
> "Friendly ping — this one's green and has been waiting on a review for a couple of weeks.
> Happy to rebase or address anything if it helps. Thanks!"

## 7. Verificar e reportar

- Confirme CI verde / threads resolvidos.
- Reporte ao usuario o estado de cada PR e o que ainda depende de maintainer.
- NAO afirme "mergeado/aprovado" sem checar o estado real via `gh pr view`.

## Lembrete de honestidade

Reporte com fidelidade: se um check falhou, diga com a saida; se algo depende de terceiro, diga; nao infle "esta pronto" sem evidencia.
