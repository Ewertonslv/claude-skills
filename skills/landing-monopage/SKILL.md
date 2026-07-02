---
name: landing-monopage
description: Use quando o usuário quer criar uma landing page / mono-page (site de uma página só) para um cliente ou negócio local — dentista, advogado, salão, estética, academia, personal, restaurante, clínica — normalmente como trabalho freelancer. Também para gerar orçamento/proposta comercial de site e instruções de publicação (Netlify, Hetzner). Ativa em: "criar site pro meu cliente", "fazer uma landing", "monta uma mono page", "quanto cobrar por um site", "publicar site do cliente". Trabalho pessoal/freelance — nunca misturar com a Viggo.
user_invocable: true
argument-hint: "[dentista|advogado|salao|academia|<profissao>]"
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

## Fundação + briefs por profissão (a ideia central)

A skill separa **o que é igual** de **o que muda por profissão**:

- **`foundation/`** — o esqueleto técnico, neutro de nicho: reset, tokens de cor (CSS vars), header com menu mobile + scroll-spy, herói, lista de serviços editorial, prova social, depoimentos, contato com WhatsApp, rodapé, FAB do WhatsApp, acessibilidade (`:focus-visible`, `prefers-reduced-motion`, progressive enhancement) e SEO (JSON-LD, OG). **Copie e preencha; não reescreva do zero.**
- **`briefs/<profissao>.md`** — a **direção de design** daquele nicho: lane estética, estratégia de paleta, par de fontes (fugindo dos clichês), tom de copy, seções e ênfase, estilo de imagem. É a "pele".

> Um dentista e um advogado usam a **mesma fundação** com **briefs diferentes** → saem visualmente distintos. Para um nicho novo, crie `briefs/<novo>.md` (ver `briefs/README.md`).

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
0 profissão → brief   1 dados   2 identidade   3 gerar site
      4 fotos   5 impeccable (validar design)   6 preview   7 proposta + deploy
```

### PASSO 0 — Resolver a profissão e ler o brief
Se o argumento (`/landing-monopage dentista`) ou os dados indicam a profissão, **leia `briefs/<profissao>.md`**. Se não houver brief para o nicho, use o mais próximo e crie um novo seguindo `briefs/README.md`. O brief é **obrigatório** — sem ele o design sai genérico.

### PASSO 1 — Coletar os dados
Peça os campos da tabela acima (ou receba de um manifesto do usuário). Campo ausente → placeholder com comentário `<!-- TODO: ... -->` e um fallback visível (ex.: monograma no lugar da foto, "a confirmar" no endereço).

### PASSO 2 — Definir a identidade (anti-genérico)
Do brief, escolha **paleta** (estratégia: restrained/committed/drenched) e **par de fontes**. **Fuja da lista reflex-reject da impeccable** (Playfair, Inter, Fraunces, Cormorant, DM Sans…). Defina as CSS vars (`--brand`, `--bg`, `--surface`, `--ink`, `--accent`) no `:root`. Cor de saúde/ERP nunca por reflexo — decida pela cena do brief.

### PASSO 3 — Gerar o site
Crie a pasta do cliente e **copie `foundation/`** para lá. Depois:
- preencha os dados (nome, serviços, contato, WhatsApp, JSON-LD);
- aplique a **pele do brief** (tokens, fontes no `<link>`, ênfase de seções);
- **quebre a repetição**: serviços em lista editorial (não cards idênticos), varie 1 seção, um "device de assinatura" quando o brief pedir. Ver **Armadilhas** abaixo.

### PASSO 4 — Fotos
Coloque as imagens reais em `assets/`. Para retrato em círculo e antes/depois, use os recortes via PowerShell/System.Drawing. **Ver `references/tecnicas-fotos-preview.md`.**

### PASSO 5 — Validar o design com a impeccable (obrigatório)
Rode a skill **impeccable** sobre o `index.html` gerado:
```
/impeccable critique <caminho>/index.html
```
Leia o veredito (AI-slop, heurísticas, prioridades P0–P3) e **aplique as correções** (ou `/impeccable polish`). Repita até não parecer template. Este passo é o "para ver se o design está perfeito" — não pule.

### PASSO 6 — Preview
Abra no navegador do usuário e gere screenshots (desktop + mobile) pra conferência. **Ver `references/tecnicas-fotos-preview.md`** (headless Chrome, truque do `min-height` do herói, gotcha da âncora).

### PASSO 7 — Proposta comercial + deploy
Monte a proposta (faixas de mercado atuais + modelo pronto pra enviar) e as instruções de publicação (Netlify Drop rápido, ou Hetzner/servidor do usuário). **Ver `references/proposta-e-deploy.md`.**

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
- `briefs/<profissao>.md` — direção de design por nicho (+ `README.md` pra criar novos).
- `references/tecnicas-fotos-preview.md` — recorte de imagens + screenshots headless.
- `references/proposta-e-deploy.md` — faixas de mercado, modelo de proposta, publicação.
