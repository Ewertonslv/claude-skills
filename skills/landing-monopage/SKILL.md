---
name: landing-monopage
description: Use quando o usuário quer criar uma landing page / mono-page (site de uma página só) para um cliente ou negócio local — dentista, advogado, salão, estética, academia, personal, restaurante, clínica — normalmente como trabalho freelancer. Também para gerar orçamento/proposta comercial de site e instruções de publicação (Netlify, Hetzner). Ativa em: "criar site pro meu cliente", "fazer uma landing", "monta uma mono page", "quanto cobrar por um site", "publicar site do cliente". Trabalho pessoal/freelance — nunca misturar com a Viggo.
user_invocable: true
argument-hint: "[<profissao> | --manifest <caminho/cliente.yaml>]"
allowed-tools:
  - Bash
  - PowerShell
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Skill
  - WebSearch
  - TodoWrite
---

# Landing Mono-Page — Gerador de sites de uma página para negócios locais

Você passa alguns dados do cliente e esta skill gera uma **mono-page profissional** (HTML/CSS/JS puro, sem build), com design **por profissão**, valida o resultado na skill **impeccable**, coloca as fotos, faz o preview e ainda monta a **proposta comercial + deploy**.

## REGRA CRÍTICA — privacidade e escopo

- Isto é **trabalho pessoal/freelance**. **NUNCA** salvar em Viggo Brain, repos `@viggo`/expxagents, nem usar tooling Viggo.
- O site do cliente vive em `C:\Users\Ewerton\Documents\Projetos github\<slug-cliente>\` (ou onde o usuário indicar), **fora** de `C:\Projetos\` (Viggo).
- **Arquivos sempre em UTF-8** (com acentos diretos: á, ç, ã). Nada de ANSI.

## Fundação + design system (a ideia central)

A skill separa **o que é técnico**, **o que é família de design** e **o que é nicho** — 3 camadas:

- **`foundation/`** — o esqueleto técnico, neutro de nicho: reset, tokens de cor (CSS vars), header com menu mobile + scroll-spy, herói, lista de serviços editorial, prova social, depoimentos, contato com WhatsApp, rodapé, FAB do WhatsApp, acessibilidade (`:focus-visible`, `prefers-reduced-motion`, progressive enhancement) e SEO (JSON-LD, OG). **Copie e preencha; não reescreva do zero.**
- **`design-system/arquetipos/`** — 6 **famílias de design** (cuidado-premium, autoridade-sobria, desejo-visual, energia-movimento, sabor-experiencia, oficio-confianca), cada uma com **2-3 combos** prontos de paleta (contraste AA validado) + fontes anti-clichê + tom + prova social.
- **`design-system/profissoes/`** — 26 **fichas finas** por profissão (arquétipo + combo default, serviços típicos, schema.org, credencial/regulatório, clichê a evitar).

> Dois clientes do mesmo nicho **rotacionam o combo** → não saem iguais. Fluxo completo e contratos: **`design-system/README.md`**. Nicho novo: copie uma ficha próxima e registre no `_INDEX.md`.

## Dados de entrada (o que pedir ao usuário)

Colete o que existir; o que faltar vira **placeholder com TODO visível** (nunca invente número/foto/depoimento).

| Campo | Ex. |
|---|---|
| `nome` | Dr. Rodrigo Dantas |
| `profissao` (→ brief) | dentista |
| `credencial` (opcional) | CRO/RN 8383 |
| `tagline` | Seu sorriso natural começa aqui. |
| `cidade` | Natal/RN |
| `whatsapp` | `5584996888662` (55 + DDD + número, só dígitos) |
| `instagram` / `endereco` / `horario` / `maps` | @handle / rua / seg-sex / iframe |
| `servicos[]` | {nome, descrição} × N |
| `prova` | fotos antes/depois **OU** galeria de trabalhos |
| `depoimentos[]` | {texto, autor} (só reais e autorizados) |
| `fotos` | caminhos no disco (retrato, resultados) |
| `marca` (opcional) | cor primária / tema; senão herda do brief |

## Pipeline

```
0 profissão → ficha+arquétipo   1 dados   2 combo   3 gerar site
      4 fotos   5 impeccable (validar design)   6 preview   7 proposta + deploy
```

### PASSO 0 — Resolver a profissão (ficha → arquétipo)
Se o argumento (`/landing-monopage dentista`) ou os dados indicam a profissão, ache-a no
`design-system/profissoes/_INDEX.md` e **leia a ficha + o arquétipo que ela aponta**. Nicho
sem ficha → use a mais próxima da família e crie a nova (`design-system/README.md`). A dupla
ficha+arquétipo é **obrigatória** — sem ela o design sai genérico.

### PASSO 1 — Coletar os dados (manifest-first)
**Com `--manifest <caminho/cliente.yaml>`**: leia o manifest e NÃO entreviste — rode o
pipeline inteiro direto (é o modo automatizado; contrato em `templates/cliente.yaml`).
**Sem manifest**: pergunte os campos da tabela acima **e GERE o `cliente.yaml` preenchido**
na pasta do cliente (a coleta nunca se perde; roteiro de perguntas pro WhatsApp em
`references/cenario-cliente-novo.md`). Campo ausente → placeholder com `<!-- TODO: ... -->`
e fallback visível (monograma no lugar da foto, "a confirmar" no endereço).

### PASSO 2 — Escolher o combo (anti-genérico)
Do arquétipo, escolha o **combo** (paleta AA-validada + fontes): o que casa com a marca do
cliente, ou o default da ficha — e **rotacione se já usou esse combo em outro cliente do
mesmo nicho**. Aplique os tokens no `:root` da foundation + a URL de fontes no `<link>`.
Nunca fontes da lista proibida (`design-system/README.md` § Regras duras).

### PASSO 3 — Gerar o site
Crie a pasta do cliente e **copie `foundation/`** para lá. Depois:
- preencha os dados (nome, serviços, contato, WhatsApp, JSON-LD);
- aplique a **pele do brief** (tokens, fontes no `<link>`, ênfase de seções);
- **quebre a repetição**: serviços em lista editorial (não cards idênticos), varie 1 seção, um "device de assinatura" quando o brief pedir. Ver **Armadilhas** abaixo.
- Para headline/tagline/CTA e texto de objeções, use a skill **copywriting** (se instalada) com o contexto da ficha.

### PASSO 4 — Fotos
Coloque as imagens reais em `assets/`. Para retrato em círculo e antes/depois, use os recortes via PowerShell/System.Drawing. **Ver `references/tecnicas-fotos-preview.md`.**

### PASSO 5 — Validar design (impeccable) + conversão (cro)
Rode a skill **impeccable** sobre o `index.html` gerado:
```
/impeccable critique <caminho>/index.html
```
Leia o veredito (AI-slop, heurísticas, prioridades P0–P3) e **aplique as correções** (ou `/impeccable polish`). Repita até não parecer template. Este passo é o "para ver se o design está perfeito" — não pule.
Depois, passe a página pela skill **cro** (se instalada): proposta de valor, headline, CTA, sinais de confiança, fricção — impeccable valida o *design*, cro valida a *conversão*.

### PASSO 6 — Preview
Abra no navegador do usuário e gere screenshots (desktop + mobile) pra conferência. **Ver `references/tecnicas-fotos-preview.md`** (headless Chrome, truque do `min-height` do herói, gotcha da âncora).

### PASSO 7 — Proposta comercial + deploy
Monte a proposta (faixas de mercado atuais + modelo pronto pra enviar) e publique:
**deploy de 1 comando no Hetzner** = `scripts/deploy-hetzner.sh <pasta> <dominio>`
(upload + vhost nginx + SSL; use `--dry-run` pra conferir antes; config SSH em
`~/.config/landing-deploy.env`). Alternativa rápida de preview: Netlify Drop.
**Ver `references/proposta-e-deploy.md`.**

## Estágios e gates (fluxo de cliente)

Cada cliente tem `cliente.yaml` + `STATUS.md` (templates em `templates/`) na pasta dele em
`sites-clientes/`. Estágios: `LEAD → BRIEFING → RASCUNHO → APROVAÇÃO → PUBLICADO → TRÁFEGO`.
**Leia o STATUS.md antes de agir** e só execute o que o estágio libera — em especial:
**tráfego pago SÓ em PUBLICADO** (domínio no ar + dados reais + TCLE + pixel); `cro` e
`copywriting` já valem no RASCUNHO; `prospecting`/`cold-email`/`offers` são pré-cliente.
Fluxo completo + roteiro de perguntas: **`references/cenario-cliente-novo.md`**.

## Armadilhas — PARE e corrija (aprendidas na prática)

| Sintoma | Correção |
|---|---|
| 3 cards idênticos de serviço | Lista editorial: ícone + nome + descrição, separados por filete. "Cards são a resposta preguiçosa." |
| Mesma foto 2× (herói e sobre) | Foto diferente em cada, **ou** tirar a do sobre (seção de texto). Nunca repetir a mesma. |
| `h1` do herói **estoura** no mobile | Item flex encolhe pro conteúdo e vaza. `max-width:100%` vira `none` em container indefinido → use **`width: calc(100vw - 2.5rem)`** (vw é definido) + `align-items:center`. |
| Foto do flyer/story como retrato | Recorte só a pessoa (fugindo de texto/UI). Se não der limpo, use outra foto ou remova. |
| Reveal-on-scroll deixa seção em branco no print | O default tem que ser visível; a animação só realça. No screenshot headless, force `prefers-reduced-motion`. |
| WhatsApp não abre | Número em `55DDDNÚMERO`, só dígitos. Link `https://wa.me/<num>?text=<msg encode>`. |
| Acento vira `�` no arquivo | Salvar UTF-8. No Windows, `Out-File -Encoding utf8`. |

## Red Flags — não faça
- Não inventar depoimento, número, endereço ou foto — placeholder com TODO.
- Não usar fonte/lane da reflex-reject list por reflexo do nicho (advogado ≠ navy+serifada colunada automática).
- Não pular a validação com a impeccable (PASSO 5).
- Não commitar/publicar nada em repositório/infra da Viggo.
- Não afirmar "pronto/publicado" sem o preview real conferido.

## Arquivos da skill
- `foundation/` — esqueleto (index.html, style.css, script.js).
- `templates/cliente.yaml` — contrato do manifest de cliente · `templates/STATUS.md` — estágios/gates.
- `scripts/deploy-hetzner.sh` — publica no VPS em 1 comando (nginx+SSL, `--dry-run` disponível).
- `references/cenario-cliente-novo.md` — fluxo ponta-a-ponta do cliente + roteiro de perguntas.
- `design-system/README.md` — contrato + fluxo de resolução (ficha → arquétipo → combo).
- `design-system/arquetipos/` — 6 famílias de design com 2-3 combos cada.
- `design-system/profissoes/` — 26 fichas por profissão + `_INDEX.md`.
- `references/tecnicas-fotos-preview.md` — recorte de imagens + screenshots headless.
- `references/proposta-e-deploy.md` — faixas de mercado, modelo de proposta, publicação.
- `references/trafego-pago.md` — 3ª perna do negócio: gestão de anúncios (Meta→Google), setup passo-a-passo, campanha local, rotina, compliance (Meta proíbe antes/depois em anúncio).
- `examples/` — saídas geradas (fictícias) pra referência; ex.: `advogado-tribuna/` mostra tema claro + CTA duplo + processo numerado.
