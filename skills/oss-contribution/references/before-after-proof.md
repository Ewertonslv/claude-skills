# Before/after proof (RED -> GREEN) e o gate "sem PR fraco"

Regra dura: **um fix sem teste que falha->passa nao vira PR.** A prova before/after e o que
faz o PR ser confiavel e o que maintainers pedem (litellm pediu explicitamente).

## A receita (git stash)

Com o fix e o teste no working tree:

```
# 1) remove SO o fix, mantem o teste
git stash push -- <arquivo(s) do fix>

# 2) roda o teste novo -> ESPERA FALHAR
uv run pytest <path>::<test>        # ou: python -m pytest ...

# 3) restaura o fix
git stash pop

# 4) roda de novo -> ESPERA PASSAR
uv run pytest <path>::<test>
```

Variante quando o fix nao da pra isolar por arquivo (ex.: 1 arquivo com fix+teste): reverter so o arquivo do fix com `git checkout <ref> -- <arquivo>`, rodar (falha), depois restaurar com `git checkout <branch> -- <arquivo>`. Ou copiar o arquivo pra temp, `git checkout` da versao antiga, testar, restaurar a copia.

## Interpretacao

- **Falha sem o fix, passa com o fix** -> prova valida. Pode submeter (apos os outros gates).
- **Passa mesmo SEM o fix** -> o teste NAO exercita o bug. NAO submeta. Refaca o teste ou conclua que o bug nao e unit-testavel.

## Simular o momento (impacto visivel ao cliente)

Quando o SINTOMA e engolido por uma camada externa (o transport captura a excecao e retorna vazio),
o teste unitario prova o `raise` mas nao o impacto ao usuario. Complemente com um repro pequeno que
imita a camada consumidora (try/except -> retorna vazio) e IMPRIME o que o cliente recebe; rode com o
fix em `stash` vs aplicado. Sessao #5451: ANTES o cliente via `text=''` (AttributeError engolido pelo
transport), DEPOIS `text='hello from remote'`. Otimo pro corpo do PR e pra confianca de quem revisa.

## Gate "sem PR fraco"

Se o bug **nao e reproduzivel em teste** (ex.: vazamento de socket que so ocorre atras de reverse-proxy, race ambiente-especifica), NAO abra um PR "adicionei um finally, confia". Em vez disso, poste um **comentario diagnostico de alta qualidade** na issue:
- causa-raiz confirmada com `file:linha` do `main` atual,
- por que so manifesta naquele ambiente (e por que nao da teste unit deterministico),
- a forma do fix proposto + se voce tem pronto,
- oferta de abrir PR se o maintainer quiser.

Isso vale mais que um PR fraco que o maintainer fecha — e mostra senioridade. Precedente: mcp/python-sdk #2958 (CLOSE_WAIT leak).

## Nao confundir com falhas pre-existentes

Antes de culpar seu codigo por uma falha de suite, cheque se ela ja acontece na `upstream/main` limpa (ver blast-radius.md). Falha que reproduz no main limpo nao e sua.
