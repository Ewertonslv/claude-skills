# Blast-radius (mudanca em tipo/union/assinatura compartilhada)

"Fix de uma linha" em tipo compartilhado quase nunca e de uma linha. Caso real: adicionar 2
membros a um discriminated union (`ModelRequestPart` no pydantic-ai) quebrou exaustividade de
`assert_never` em 2 adapters E reclassificou parts via um `MessagesBuilder`, quebrando 8 testes
de snapshot. O `ruff` local passou; o CI (pyright + suite) pegou.

## Quando este gate dispara

Voce mudou: um `Union`/discriminated-union, uma classe base, uma assinatura publica, um enum,
um conjunto de tags/membros, ou algo importado em muitos lugares.

## Protocolo

1. **Cace TODOS os consumidores exaustivos** do tipo:
   - `assert_never(` (typecheck quebra se sobrar membro nao tratado),
   - cadeias de `isinstance(...)` / `match`/`case _:`,
   - "builders"/dispatchers que classificam por pertenca ao tipo (ex.: `isinstance(part, get_union_args(ModelRequestPart))`),
   - serializacao/discriminadores.
   ```
   grep -rn "assert_never\|isinstance(.*<Tipo>\|get_union_args" <pkg>
   ```
2. **Rode o typecheck COMPLETO do repo**, nao so `ruff`:
   - pydantic-ai: `make typecheck-pyright` (o job `lint` do CI).
   - outros: o comando de typecheck em targets.md.
3. **Rode a suite afetada completa** (nao so 1 teste): `uv run pytest <area>`.
4. **Separe pre-existente de culpa sua:**
   ```
   git checkout upstream/main      # detached, arvore limpa
   uv run pytest <suite>           # baseline deste ambiente
   git checkout <sua-branch>
   ```
   Falha que reproduz no `upstream/main` limpo NAO e sua. Falha que so aparece na sua branch e sua.

## Resultado

- Se o blast-radius e mecanico (ex.: estender `isinstance(part, (A, B))`) e voce consegue cobrir + validar tudo -> faca o fix completo (codigo + testes/snapshots) com prova.
- Se o blast-radius envolve **decisao semantica** (ex.: "native return deve ser request part ou response part?", churn grande de snapshot) -> NAO bulldoze. Va pra draft-and-ask.md.

## Sinais de que voce esta prestes a errar

- "So rodar `ruff` e o teste que eu escrevi" — insuficiente; o CI roda pyright + suite inteira.
- "Vou so regenerar os snapshots" — pode estar mascarando regressao semantica.
