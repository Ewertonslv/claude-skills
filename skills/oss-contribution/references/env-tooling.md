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

## Encoding de arquivos Python

Arquivos `.py` sao UTF-8; chars acentuados diretos OK. (Isto e codigo OSS, nao os `.pas`/`.dfm` ANSI da Viggo.)
