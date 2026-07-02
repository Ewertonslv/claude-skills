# Design System — como funciona

Sistema em **3 camadas** que separa o que é técnico, o que é família de design e o que é nicho:

```
foundation/  (1)  esqueleto técnico — igual pra todos (tokens CSS, a11y, WhatsApp, SEO)
arquetipos/  (6)  famílias de design — paletas+fontes+tom compartilhados por setor
profissoes/ (26)  fichas finas — serviços, credencial, prova, clichê a evitar
```

## Fluxo de resolução (o gerador segue isto)

1. **Profissão** → ler `profissoes/<profissao>.md` (usar `_INDEX.md` pra achar; nicho sem ficha → usar a mais próxima e criar a nova).
2. A ficha aponta o **arquétipo** → ler `arquetipos/<arquetipo>.md`.
3. Escolher o **combo** (paleta+fontes) do arquétipo:
   - Se o cliente tem marca/cor/preferência → o combo que casa (ou adaptar `--brand`).
   - Sem preferência → o combo default da ficha; **se você já usou esse combo pra outro cliente do mesmo nicho, rotacione** pro próximo (dois clientes seus não podem sair iguais).
4. Aplicar: tokens do combo no `:root` do `style.css` da foundation + URL de fontes no `<link>` + `@type` do schema.org da ficha.
5. Validar com a **impeccable** (PASSO 5 da SKILL) — o arquétipo dá o rumo; a impeccable pega o que ficou genérico.

## Contratos (schema fixo)

**Arquétipo** (`arquetipos/*.md`): Cena · Lane estética + anti-clichê da família · **Combos** (2-3: nome, tokens `--bg --surface --ink --muted --brand --accent --brand-rgb`, fontes + Google Fonts URL, quando usar) · Ênfase de seções + prova social · Device de assinatura · Tom de copy + CTA · Imagem.

**Ficha** (`profissoes/*.md`): arquétipo + combo default · schema.org `@type` · credencial/regulatório · serviços típicos · prova social preferida · CTA + msg WhatsApp · clichê específico a evitar · overrides.

## Regras duras

- **Contraste AA**: `--muted` sobre `--bg` e `--surface` ≥ 4.5:1. Toda paleta aqui foi validada; se alterar um valor, recalcule.
- **Fontes proibidas** (reflex-reject da impeccable + saturadas 2026): Playfair, Inter, Fraunces, Cormorant, Crimson, Lora, Newsreader, Syne, IBM Plex, Space Grotesk/Mono, DM Sans/Serif, Outfit, Plus Jakarta, Instrument Sans/Serif, Montserrat, Oswald, Bebas Neue, Roboto, Open Sans, Lato, Geist.
- **Anti-reflexo em 2 ordens**: nem o clichê do nicho (dentista=azul), nem o "anti-clichê já saturado" (tudo virar editorial-serif-italic). Cada arquétipo nomeia os dois.
- Fontes podem repetir entre **arquétipos diferentes** (o pool bom do Google Fonts é finito), nunca entre combos do mesmo arquétipo.

## Adicionar profissão nova

1. Escolha o arquétipo mais próximo (ou crie um, se for família nova de verdade).
2. Copie uma ficha existente do mesmo arquétipo e ajuste os campos.
3. Registre na tabela do `profissoes/_INDEX.md`.

## Adicionar combo/arquétipo novo

Valide o contraste antes (script node no `references/tecnicas-fotos-preview.md` § encoding, ou qualquer calculadora WCAG) e cheque as fontes contra a lista proibida.
