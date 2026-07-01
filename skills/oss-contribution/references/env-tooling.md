# Env & tooling (Windows / PowerShell / gh / git / uv)

Ambiente: Windows, GitHub CLI autenticado como `Ewertonslv`. Gotchas que ja nos custaram tempo.

## PowerShell + gh JSON

- **NAO use `jq` inline com `\(...)`** — o PowerShell quebra a interpolacao (`gh: accepts 1 arg(s), received N`). Em vez disso, parse com objeto:
  ```powershell
  $o = (gh pr view <n> --repo OWNER/REPO --json state,comments | Out-String | ConvertFrom-Json)
  $o.comments | ForEach-Object { Write-Output "[$($_.author.login)] $($_.body.Substring(0,[Math]::Min(120,$_.body.Length)))" }
  ```
- `.Count` de um objeto unico e `$null`; trate antes de comparar.
- Via Bash tool (Git Bash) o `jq` funciona normal — alternativa quando precisar.

## gh --input precisa UTF-8 SEM BOM

`Out-File -Encoding utf8` no Windows PowerShell 5.1 adiciona **BOM**, que faz a API responder
`400 Problems parsing JSON`. Sempre gravar sem BOM:
```powershell
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($path, $json, $utf8NoBom)
```
Para body de PR/comentario, gravar o markdown com o mesmo metodo e usar `--body-file`.

## git stderr no PowerShell

`git push`/`fetch`/`checkout` escrevem em stderr; o PowerShell embrulha como erro (NativeCommandError)
mesmo no sucesso. Confie no resultado (ex.: a linha `<sha>..<sha> branch -> branch` = push OK), nao
no fato de "ter aparecido vermelho".

## Resolver thread / responder

GraphQL via `gh api graphql --input <file.json>` (ver review-response.md). Mutations: `resolveReviewThread`.

## Python / repos

- `uv run pytest <path>` / `uv sync --dev` (fastmcp, pydantic-ai, python-sdk).
- `ruff check <files>` / `ruff format --check <files>` — necessario mas NAO suficiente (nao pega exaustividade/pyright).
- pydantic-ai typecheck: `make typecheck-pyright`. Rodar antes do push.
- litellm: venv proprio (`.venv`), `python -m pytest <path>`; proxy local com `DISABLE_SCHEMA_UPDATE=true` + `PYTHONIOENCODING=utf-8` (ver repo-rules.md).

## litellm: gotchas de teste/lint locais

Vividos numa sessao real (PR #31601). Evitam re-tropecar:

1. **ruff NAO esta no venv do litellm.** `python -m ruff` falha com `No module named ruff`.
   Rodar via `uvx ruff check <files>` / `uvx ruff format --check <files>`. (CI usa ruff; localmente e uvx.)
2. **`ruff format --check` em arquivo pre-existentemente nao-formatado** reclama do arquivo INTEIRO
   mesmo com suas linhas limpas (ex.: `tests/test_litellm/test_cost_calculator.py` tem ~276 `print` legados).
   Antes de reformatar e inchar o diff, confirme que a base ja esta "would reformat":
   `git show upstream/<base>:<path> > /tmp/x.py; uvx ruff format --check /tmp/x.py`. Se sim, NAO reformate o
   arquivo todo — so garanta que seu range esta limpo (`uvx ruff check`) e que os hunks de
   `uvx ruff format --diff` nao tocam suas linhas adicionadas.
3. **`vcr` ausente trava alguns suites.** `tests/logging_callback_tests/test_standard_logging_payload.py`
   importa `vcr` no conftest -> `ModuleNotFoundError: No module named 'vcr'`. Para fix de cost/pricing,
   `tests/test_litellm/test_cost_calculator.py` roda SEM vcr — prefira-o. Se precisar dos suites vcr-gated,
   `uv pip install vcrpy` no venv. Reporte honestamente quando um suite nao rodou por dep faltante.
4. **Rodar testes suja artefatos.** Execucoes modificam o cache de tokenizer
   (`litellm/litellm_core_utils/tokenizers/<hash>`) e disparam avisos LF->CRLF. Antes de `git add`,
   cheque `git status --short` e restaure o nao-intencional:
   `git checkout -- litellm/litellm_core_utils/tokenizers/`. (Complementa authoring-hygiene, que so cita
   o artefato de install editavel, nao o de test run.)

## Repos com dev-deps nativas (Windows) + tools Linux-only (pytype)

Vivido no mcp-context-forge (#5451):

1. **`uv sync --group dev`/`--dev` QUEBRA no Windows** se uma dev-dep compila nativo (aqui `pytype`
   -> `Unable to find a compatible Visual Studio installation`). A sync aborta e NENHUM pytest instala.
   - Instalar o stack avulso: `uv pip install pytest pytest-asyncio pytest-env pytest-httpx pytest-timeout pytest-mock ruff black isort bandit pylint`.
   - Rodar com `uv run --no-sync pytest ...` pra NAO re-disparar a sync quebrada.
2. **Tool Linux-only (pytype) via Docker no Windows:**
   - Daemon off? `Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"` e poll `docker info`.
   - Git Bash MASTIGA path de container (`-w /app` vira `C:/Program Files/Git/app`). Usar:
     `MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd -W)":/app -w //app python:<ver> bash -lc '...'`.
   - CASAR a versao do Python com a config do repo, nao a mais nova: `[tool.pytype] python_version`
     do mcp-context-forge = 3.11 -> `python:3.11` + `--python-version=3.11`. Dentro: `pip install -e .` + `pip install pytype`.
3. **NAO usar `tail`/`head` quando precisa da lista COMPLETA de erros de linter/typechecker.** pytype/pylint
   marcam `~~~~` por linha e o veredito vem no fim; truncar perde o pass/fail e o `file:linha` de cada erro.
   Redirecionar a saida inteira a um arquivo e `grep` pelos seus ranges. (Vivido: `tail -40` no container
   escondeu se o pytype passou ou so reclamou de codigo pre-existente.)

## git grep lento em clone blobless

`git grep <pat> <rev> -- '**/*.py'` num clone `--filter=blob:none` baixa blobs sob demanda e pode
ESTOURAR timeout (2 min). Em vez disso: faca checkout da base num branch e use ripgrep/Grep no working
tree, ou restrinja o `git grep` a paths ja materializados.

## gh --jq embutido e OK (!= jq standalone)

O aviso "NAO use jq" acima e so sobre o `jq` STANDALONE com `\(...)` no PowerShell. O `--jq` EMBUTIDO do
`gh` (`gh ... --jq '...'`) funciona bem (inclusive via Bash tool) e e preferivel a pipar pro jq externo.

## Encoding de arquivos Python

Arquivos `.py` sao UTF-8; chars acentuados diretos OK. (Isto e codigo OSS, nao os `.pas`/`.dfm` ANSI da Viggo.)
