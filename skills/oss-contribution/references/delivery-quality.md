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

**Enumere os gates REAIS do repo** lendo `tox.ini` / `Makefile` / workflow de CI — nao assuma so ruff.
Ex. (mcp-context-forge): `ruff check` + `black --check` + `isort --check` + `bandit` + `pytype` +
`pylint` + **doctest** (`pytest --doctest-modules <pkg>`). Rode TODOS, nao so o seu teste:

- **Suite afetada completa** do repo (`uv run pytest <area>` / `python -m pytest <area>`), nao so 1 teste.
- **Lint/format/typecheck** conforme o repo: ruff, black, isort, pylint, bandit, pyright/pytype.
  `ruff` NAO pega exaustividade — rode o typecheck real (`make typecheck-pyright`, `pytype`, etc.).
- **Doctest**: se o CI roda `pytest --doctest-modules <pkg>`, um fix numa funcao com bloco `Examples:`
  no docstring precisa manter os doctests verdes (facil esquecer; o CI pega).
- Tool que so roda em Linux (pytype no Windows)? Rode via Docker (env-tooling.md) OU declare e valide via Draft PR.
- Separe falha pre-existente de culpa sua (checkout `upstream/main` limpo — blast-radius.md).

### 4b. Novos-problemas-vs-upstream (linter com divida pre-existente)

Linter reclama do arquivo inteiro (isort/pylint/ruff-format/black) mesmo com suas linhas limpas?
Prove que voce nao adicionou nada novo: rode o tool no seu working file E na versao
`git show upstream/<base>:<path>` colocada **no caminho in-repo** (a config e relativa ao path —
`/tmp` perde `[tool.isort]`/`.pylintrc` e da falso-alarme: sessao #5451 deu 37 hunks no /tmp vs 3
in-repo). Contagem igual => zero problema novo seu => **NAO reformate divida alheia** (scope creep);
corrija so suas linhas. (Sessao #5451: isort 3==3, pylint 0==0 -> nao toquei em nada.) O gotcha
ruff-format do litellm em env-tooling.md e um caso particular disto.

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
