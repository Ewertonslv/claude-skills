# Delivery quality (gates padrao + convencoes do repo)

Disciplina de engenharia que vale para QUALQUER mudanca de codigo (discover ou support),
nao so quando o blast-radius dispara. Uma boa entrega = fix minimo correto + teste abrangente
+ gates verdes + convencoes do repo respeitadas + diff auto-revisado.

## 1. Entender antes de corrigir

REQUIRED SUB-SKILL quando o bug nao e trivial: **superpowers:systematic-debugging**.

- Ler a discussao da issue inteira: o maintainer frequentemente ja indica a abordagem preferida, restricoes, ou um "wontfix/needs-design". Nao contrarie isso.
- Estudar a area: `git log -p <arquivo>`, `git blame`, e como fixes parecidos foram feitos no repo (procurar PRs anteriores no mesmo modulo). Espelhe o idioma e os padroes do codebase.
- Achar a causa-raiz de verdade (nao tratar sintoma). Se houver escolha de abordagem com trade-offs, considere alternativas (superpowers:brainstorming) antes de codar.

## 2. Teste-primeiro (TDD)

REQUIRED SUB-SKILL: **superpowers:test-driven-development**.

- Escreva o teste que captura o bug **primeiro**; rode e veja FALHAR (RED) pela razao certa.
- So entao escreva o fix minimo; rode e veja PASSAR (GREEN).
- A prova `git stash` (before-after-proof.md) confirma o RED->GREEN. TDD = a ordem correta de chegar la.

## 3. Abrangencia do teste

- Cubra **tudo que voce mudou**, nao so o caminho feliz do bug. Se adicionou N membros/ramos/casos, teste os N (licao do nitpick do CodeRabbit: adicionar 2 tags e testar 1 deixa metade sem cobertura).
- Edge cases: vazio/None, limites, concorrencia se aplicavel, erro/excecao, valores invalidos.
- Teste comportamento, nao implementacao.

## 4. Gates de qualidade padrao (SEMPRE, antes de abrir/atualizar PR)

Rode TODOS, nao so o seu teste:

- **Suite afetada completa** do repo (`uv run pytest <area>` / `python -m pytest <area>`), nao so 1 teste.
- **Lint + format**: `ruff check <files>` e `ruff format --check <files>`.
- **Typecheck** quando o repo tem: `make typecheck-pyright` (pydantic-ai) ou equivalente — `ruff` NAO pega exaustividade.
- Separe falha pre-existente de culpa sua (checkout `upstream/main` limpo — blast-radius.md).

## 5. Convencoes de contribuicao do repo

Verifique ANTES de abrir (varios reprovam no CI/review por isso):

- `CONTRIBUTING.md` e o **template de PR** (`.github/PULL_REQUEST_TEMPLATE*`) — preencher as secoes exigidas.
- **CHANGELOG / news fragment**: alguns repos exigem uma entrada (ex.: `changelog.d/`, `newsfragments/`, towncrier). Cheque se ha.
- **DCO / sign-off**: se o repo exige Developer Certificate of Origin, commit com `git commit -s` (`Signed-off-by: Ewerton Silva <ewertoncom297@gmail.com>`).
- Regra de assignment / branch base (repo-rules.md, targets.md).
- **Escopo unico**: um PR resolve UMA issue; nao agrupar mudancas nao relacionadas.

## 6. Auto-review antes de abrir

REQUIRED SUB-SKILL: **superpowers:requesting-code-review** (ou rodar `/simplify` no diff).

- Ler o proprio `git diff` linha a linha: e o diff MINIMO que resolve? Sobrou print/debug/comentario morto? Reusa utilitario existente em vez de codigo novo? Segue o estilo ao redor?
- `git status --short` — commitou so os arquivos pretendidos (sem artefatos)?

## 7. Verificacao antes de concluir

REQUIRED SUB-SKILL: **superpowers:verification-before-completion**.

- Nao afirmar "pronto/verde" sem rodar e ver a saida. Colar evidencia real (before/after) no PR.
- Reportar com fidelidade o que passou, o que falhou e o que depende do maintainer.
