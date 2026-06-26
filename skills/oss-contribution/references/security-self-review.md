# Security self-review (review da propria mudanca)

Quando seu fix "abre" um caminho — encaminha params, relaxa um filtro, repassa input do caller
adiante — pergunte: **o que MAIS pode fluir por aqui?** Foi assim que um reviewer pegou um
bypass de routing-control num dos nossos PRs.

## Caso real (litellm #30881)

Generalizamos um merge de `non_default_params` no image-edit. A transform do OpenRouter copiava
**todo** key extra pro corpo do `/chat/completions`. Resultado: um caller poderia injetar
`models`/`route`/`provider`/`transforms` (campos de roteamento do OpenRouter) num image-edit de
modelo permitido e **rotear pra um modelo fora da autorizacao/budget do LiteLLM**.

Fix: skip-set localizado na transform —
`OPENROUTER_ROUTING_CONTROL_PARAMS = {"models","route","provider","transforms"}` — preservando os
params legitimos (`image_config`). + teste de regressao (routing controls descartados, image_config
sobrevive; falha sem o fix).

## Checklist quando voce "abre" um forward/param

1. **Quem controla o valor?** Se vem do request body do caller (proxy multi-tenant), e superficie de ataque.
2. **Para onde vai?** Rastreie ate o sink (transform/handler que monta o request upstream). O sink copia tudo (denylist fraco) ou so um allowlist?
3. **O que mais pode vir junto?** Liste campos perigosos da API alvo: roteamento (models/route/provider/transforms/fallbacks), auth/headers, base_url/endpoint (SSRF), flags de billing.
4. **Bypassa controle do proxy?** Autorizacao de modelo, budget, rate-limit, allowlist de modelos.
5. **Fix:** allowlist do que e intencional, OU denylist dos controles perigosos, no ponto mais localizado (a transform do provider, nao o merge generico). + teste de regressao before/after.

## Classes a vigiar

- **Routing/model override** (chega em modelo nao autorizado).
- **SSRF** (caller controla url/api_base/host -> servidor busca interno: 169.254.169.254, localhost).
- **Header/identity injection** (sobrescreve auth, x-* confiaveis).
- **Param que vira template/codigo** (SSTI/eval downstream).

Se achar algo, trate como o achado de seguranca que e: fix localizado + teste + responder/resolver o thread (review-response.md).
