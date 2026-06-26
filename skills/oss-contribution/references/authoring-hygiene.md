# Authoring hygiene (identidade, branch, commit, PR)

Identidade fixa: GitHub `Ewertonslv`; autor de commit **`Ewerton Silva <ewertoncom297@gmail.com>`**
(esse email esta vinculado a conta, entao os commits mergeados contam no grafico de contribuicoes).

## REGRA DURA: sem trailer Claude

NUNCA adicionar `Co-Authored-By: Claude` (nem qualquer co-author de IA) nos commits. Eles
aparecem como contribuidor no GitHub. Trabalho e autorado so como Ewerton Silva.

## Fork + clone (leve)

```
gh repo fork OWNER/REPO --clone=false
git clone --filter=blob:none https://github.com/Ewertonslv/REPO.git
git -C REPO remote add upstream https://github.com/OWNER/REPO.git
git -C REPO fetch --filter=blob:none upstream <base>
```
Reusar clones existentes (targets.md) quando houver.

## Branch off da base FRESCA

Forks ficam atras. Sempre criar a branch a partir do upstream atual, nao do fork main:
```
git fetch --filter=blob:none upstream <base>
git checkout -b <branch-descritiva> upstream/<base>
```
`<base>` pode nao ser `main` (litellm usa `litellm_*_staging`) — confira.

## Commit

- **Conventional Commits**: `fix(scope): ...`, `test(scope): ...`, `feat(scope): ...`.
- Autor explicito (sem depender do git config global):
  ```
  git -c user.name="Ewerton Silva" -c user.email="ewertoncom297@gmail.com" commit -m "<msg>"
  ```
- `git add` **so dos arquivos pretendidos** — nao incluir artefatos (ex.: arquivos de tokenizer regenerados por install editavel). Cheque `git status --short` antes.

## PR

- Body **proprio** (NAO colar a sugestao do bot verbatim). Estrutura: Summary / root-cause / Fix / Test (before-after) / `Closes #<num>`.
- Criar via `gh pr create --repo OWNER/REPO --base <base> --head Ewertonslv:<branch> --title "..." --body-file <arquivo>`.
- O body-file precisa ser UTF-8 **sem BOM** (env-tooling.md).
- Toda criacao/edicao de PR = confirm-gate (mostrar comando + body, esperar OK).

## Push

```
git push -u origin <branch>           # ou git push origin <local>:<remote-branch>
```
Confirm-gate.
