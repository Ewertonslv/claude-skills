# Briefs por profissão — como funciona e como adicionar

Cada arquivo `<profissao>.md` é a **direção de design** de um nicho, aplicada sobre a `foundation/`. Prontos: `dentista`, `advogado`, `salao-estetica`, `academia-personal`.

## Como o gerador usa
1. Resolve a profissão pelo argumento/dados.
2. Lê o brief → obtém paleta (tokens), fontes, ênfase de seções, tom, imagem.
3. Aplica no site copiado da `foundation/` e roda a **impeccable** pra garantir que não ficou genérico.

## Criar um brief novo (ex.: restaurante, pet shop, arquiteto)
Copie o esqueleto abaixo. **Regra de ouro:** nomeie a *cena física* e escolha uma lane que **fuja do reflexo óbvio do nicho** (a impeccable rejeita design que dá pra adivinhar pela categoria). Fuja da reflex-reject list de fontes (Playfair, Inter, Fraunces, Cormorant, DM Sans, Space Grotesk…).

```markdown
# Brief — <Profissão>

**Cena:** <quem usa, onde, com que sentimento — 1 frase física>
**Lane estética:** <direção> — evite o clichê "<reflexo óbvio do nicho>".
**Paleta (<restrained|committed|drenched>):**
  --bg / --surface / --ink / --muted / --brand / --accent / --brand-rgb
**Fontes:** display <X> + corpo <Y> — <Google Fonts URL>
**Seções + ênfase:** <qual seção é o pico; o que enfatizar>
**Device de assinatura:** <opcional>
**Tom de copy:** <voz + CTA>
**Imagem:** <o que fotografar; imagem é essencial?>
**Serviços típicos:** <lista>
**schema.org @type:** <tipo>
```

Valide contraste (AA ≥ 4.5:1 para corpo) e teste o par de fontes num render real antes de fechar.
