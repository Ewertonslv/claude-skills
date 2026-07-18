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
- O site do cliente vive no **monorepo** `C:\Users\Windows\Documents\Projetos\sites-clientes\<slug>\`, **fora** de qualquer coisa da Viggo. Os **arquivos web** (index.html, style.css, script.js, assets/) ficam em **`<slug>/public/`**; os **docs internos** (cliente.yaml, STATUS.md, PLANO-TRAFEGO.md) ficam na **raiz** da pasta do cliente — o Coolify serve só `public/`, então o financeiro nunca vai pro ar.
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
0 profissão → ficha+arquétipo   1 dados   2 combo   3 gerar site (em <slug>/public/)
      4 fotos   5 impeccable (validar design)   6 preview LIVE (novo-cliente.ps1 → link sslip.io)   7 proposta + produção
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
Crie `sites-clientes/<slug>/` e **copie `foundation/` para `<slug>/public/`** (os arquivos web ficam em `public/`; `cliente.yaml`/`STATUS.md`/`PLANO-TRAFEGO.md` ficam na **raiz** da pasta, nunca em `public/`). O `noindex` **não se põe à mão**: ele é derivado do estágio no `STATUS.md` pelos scripts de deploy (≠ PUBLICADO → entra; PUBLICADO → sai). Depois:
- preencha os dados (nome, serviços, contato, JSON-LD);
- **WhatsApp/Instagram/mensagem vão no `config.js`**, nunca no `script.js`. O `script.js` é **igual em todos os sites** e sincronizado por `_scripts/sync-foundation.ps1`: se você editá-lo por cliente, a próxima sync sobrescreve. Precisa mudar comportamento? Edite `foundation/script.js` e rode a sync.
- aplique a **pele do brief** (tokens, fontes, ênfase de seções);
- **quebre a repetição**: serviços em lista editorial (não cards idênticos), varie 1 seção, um "device de assinatura" quando o brief pedir. Ver **Armadilhas** abaixo.
- Para headline/tagline/CTA e texto de objeções, use a skill **copywriting** (se instalada) com o contexto da ficha.

### PASSO 3.5 — Fontes: hospedar, nunca CDN
**Nunca** deixe `<link href="fonts.googleapis.com/...">` no site. É um stylesheet de terceiro que **bloqueia a renderização** (DNS + TLS + CSS antes de o navegador sequer descobrir o woff2) — o maior custo de LCP da página — e ainda entrega o IP do visitante pro Google (LGPD). Depois de escolher o combo:
```
python _scripts/hospedar-fontes.py <slug>
```
Ele baixa os woff2, gera `fonts.css` com `@font-face` local + `font-display: swap`, e troca o `<link>` do Google por preload + CSS local. Confira com `python _scripts/hospedar-fontes.py --check` (sai != 0 se algum site ainda usa o CDN).

### PASSO 4 — Fotos
Coloque as imagens reais em `<slug>/public/assets/`. Para retrato em círculo e antes/depois, use os recortes via PowerShell/System.Drawing. **Ver `references/tecnicas-fotos-preview.md`.**

Toda imagem, sem exceção:
- **`.webp` + `.jpg`**, servidos por `<picture>` (`<source type="image/webp">` + `<img src="...jpg">`). Economiza ~45%. **Guarde sempre o `.jpg`**: é ele que o `og:image` usa — o crawler do WhatsApp/Facebook **não lê WebP**.
- **`width` e `height`** com as dimensões **reais** do arquivo (senão a página "pula" enquanto carrega = CLS, que o Google penaliza). O CSS base já tem `img { height: auto }` — sem isso, `width`+`height` **distorcem** a foto.
- Retrato do herói: `fetchpriority="high"`, **sem** `loading="lazy"` (ele é o LCP; lazy nele piora). Todo o resto: `loading="lazy"`.

### PASSO 5 — Validar design (impeccable) + conversão (cro)
Rode a skill **impeccable** sobre o `index.html` gerado:
```
/impeccable critique <caminho>/index.html
```
Leia o veredito (AI-slop, heurísticas, prioridades P0–P3) e **aplique as correções** (ou `/impeccable polish`). Repita até não parecer template. Este passo é o "para ver se o design está perfeito" — não pule.
Depois, passe a página pela skill **cro** (se instalada): proposta de valor, headline, CTA, sinais de confiança, fricção — impeccable valida o *design*, cro valida a *conversão*.

### PASSO 6 — Preview (LIVE, pronto pra enviar ao cliente)
Primeiro confira local (screenshots desktop+mobile — **ver `references/tecnicas-fotos-preview.md`**). Depois **publique o preview de verdade** com 1 comando:
```
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\Windows\Documents\Projetos\sites-clientes\_scripts\novo-cliente.ps1 -Slug <slug>
```
Ele faz `git push` do monorepo + cria o app no Coolify (via API) + publica em **`https://<slug>.<IP-do-servidor>.sslip.io`** com SSL automático, e devolve o link. **É esse link que vai pro cliente** (grátis, sem comprar domínio). Pré-req: **túnel do Coolify de pé** (`localhost:9000`); se cair: `ssh -N -L 9000:localhost:8000 -L 6001:localhost:6001 root@<IP-do-servidor>`. Detalhes em `references/proposta-e-deploy.md`.
> **1ª vez** usa `novo-cliente.ps1`. Pra **republicar depois de editar**, use `_scripts/atualizar-cliente.ps1 -Slug <slug>` (push + redeploy) — **NÃO** rode `novo-cliente` de novo, cria app duplicado.

### PASSO 7 — Proposta comercial + produção
Monte a proposta (faixas atuais + modelo pronto — **ver `references/proposta-e-deploy.md`**) e envie junto com o **link de preview** (passo 6).
**Produção (1 comando, só quando o cliente APROVA + PAGA):** registre o **domínio real dele** no Registro.br apontando pro IP `<IP-do-servidor>` (A → IP; espere propagar), então rode `_scripts/publicar-cliente.ps1 -Slug <slug> -Dominio <dominio-real>`. Ele marca o estágio como PUBLICADO, **tira o `noindex`** (derivado do estágio), **preenche `og:url`/`og:image`/`canonical`** com o domínio real, troca o domínio do app (`sslip.io` → real) e redeploya (aborta sozinho se o domínio ainda não apontar pro servidor). Não sobra nada pra fazer à mão.
> Confira o cartão de compartilhamento no [Sharing Debugger](https://developers.facebook.com/tools/debug/) — é o único jeito de saber se o link vai aparecer com imagem no WhatsApp.
> O `scripts/deploy-hetzner.sh` (nginx manual) é **legado** — a infra agora é **Coolify** (não use o script antigo, ele conflita com o proxy do Coolify nas portas 80/443).

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
- `scripts/deploy-hetzner.sh` — **LEGADO** (nginx manual; substituído pelo Coolify — não usar).
- **Deploy real (no monorepo `sites-clientes/_scripts/`, fora da skill):** `novo-cliente.ps1` (cria preview no Coolify via API + sslip.io) · `atualizar-cliente.ps1` (push + redeploy de um existente) · `publicar-cliente.ps1 -Slug <s> -Dominio <d>` (produção: tira noindex + troca pro domínio real + redeploy). Infra na brain ("Infra sites-clientes LIVE", "Script novo-cliente.ps1").
- `references/cenario-cliente-novo.md` — fluxo ponta-a-ponta do cliente + roteiro de perguntas.
- `design-system/README.md` — contrato + fluxo de resolução (ficha → arquétipo → combo).
- `design-system/arquetipos/` — 6 famílias de design com 2-3 combos cada.
- `design-system/profissoes/` — 26 fichas por profissão + `_INDEX.md`.
- `references/tecnicas-fotos-preview.md` — recorte de imagens + screenshots headless.
- `references/proposta-e-deploy.md` — faixas de mercado, modelo de proposta, publicação.
- `references/trafego-pago.md` — 3ª perna do negócio: gestão de anúncios (Meta→Google), setup passo-a-passo, campanha local, rotina, compliance (Meta proíbe antes/depois em anúncio).
- `examples/` — saídas geradas (fictícias) pra referência; ex.: `advogado-tribuna/` mostra tema claro + CTA duplo + processo numerado.
