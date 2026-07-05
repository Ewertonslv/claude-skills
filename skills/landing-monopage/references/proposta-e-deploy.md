# Proposta comercial + Deploy

> Preços mudam. **Antes de fechar valores, rode um `WebSearch`** ("quanto cobrar landing page <ano>", "quanto cobrar site dentista/advogado <ano>", "manutenção mensal site <ano>") e atualize as faixas. As abaixo são referência BR 2026.

## Faixas de mercado (BR, 2026)

**Criação (único):**
- One-page comum: R$ 970–1.500 · básica R$ 500–2.000 · pequena empresa R$ 800–3.320
- Freelancer landing (recomendado): R$ 1.000–1.500
- **Site custom para profissional** (design próprio, fotos, SEO, WhatsApp): **R$ 1.500–2.500** ← é o que esta skill entrega
- Agência R$ 2.000–4.000+ · personalizado R$ 4.500–8.000

**Recorrente (host + manutenção):**
- Manutenção mensal site simples: R$ 100–500/mês
- Hospedagem: compartilhada R$ 10–50/mês · pacote (host+domínio+SSL+suporte) R$ 100–400/mês
- Domínio `.com.br`: ~R$ 40/ano

## Recomendação de precificação (3 níveis)

| Nível | Criação | Mensal |
|---|---|---|
| Entrada | R$ 1.500 | R$ 100/mês |
| **Recomendado** | **R$ 1.800** (ou 2×950) | **R$ 120/mês** (ou R$ 1.200/ano) |
| Premium (+ domínio, Google Meu Negócio, setup tráfego) | R$ 2.500 | R$ 150/mês |

**O ouro do servidor próprio (Hetzner):** um VPS (~R$ 30/mês) hospeda vários clientes → cobrar R$ 100–150/mês por site é margem alta. **Venda por valor** ("capta paciente/cliente pelo WhatsApp 24h"), não por horas.

## 3ª perna — Gestão de tráfego pago (ver `trafego-pago.md`)

| Item | Faixa iniciante (2026) | Observação |
|---|---|---|
| Setup (contas + pixel + 1ª campanha) | R$ 300–800 (sugestão R$ 400) | único |
| Gestão mensal (1 conta) | R$ 500–1.500 (sugestão R$ 500–800) | seu honorário |
| Verba de anúncio | R$ 600–1.500/mês (local, 1 plataforma) | **à parte, no cartão do cliente** |

Combo completo (âncora de venda): **criação R$ 1.800 + R$ 120/mês (site) + R$ 600/mês (gestão) + verba do cliente**.
Frase pro cliente: "o site é a vitrine; o tráfego é quem traz gente pra ela".
Para desenhar/empacotar a oferta (garantia, bônus, ancoragem), use a skill **offers**;
para conseguir clientes novos (lista + abordagem), **prospecting** + **cold-email**.
Linha extra no modelo de proposta:

```
🚀 OPCIONAL — TRÁFEGO PAGO (anúncios no Instagram/Facebook)
• Setup das contas e do pixel: R$ 400 (único)
• Gestão mensal (campanhas + otimização semanal + relatório): R$ 600/mês
• Verba dos anúncios: paga por você direto à plataforma (recomendo a partir de R$ 600/mês)
  As contas ficam no SEU nome — o histórico e o público construído são seus.
```

## Modelo de proposta (ajuste números e envie)

```
Olá, {NOME}! 😊
Segue a proposta do site profissional.

✅ INCLUÍDO
• Landing page profissional, one-page, design exclusivo (não é template)
• 100% responsiva (perfeita no celular)
• Botão de WhatsApp com mensagem automática
• Seções: Início, Sobre, {Serviços/Áreas}, {Resultados/Portfólio}, Depoimentos, Contato
• Fotos tratadas + otimizado para o Google (SEO local, aparece nas buscas)
• Rápido e seguro (SSL/https)

💵 INVESTIMENTO
• Criação (único): R$ 1.800 — ou 2x de R$ 950
• Mensalidade: R$ 120/mês — hospedagem, domínio, segurança e manutenção
  (pequenos ajustes de foto/horário/promoção inclusos) · Anual: R$ 1.200 (2 meses grátis)

🎯 POR QUE VALE
O site trabalha por você 24h captando clientes pelo WhatsApp.

📌 PRÓXIMO PASSO
Me envie {dados que faltam: endereço, horário, depoimentos reais, fotos}.
Publico em até X dias após os dados.
```
Opcional: gerar a proposta como **Artifact/HTML** (link bonito) — carrega o mesmo profissionalismo do preview.

## Deploy

Infra: **VPS Hetzner + Coolify** (self-hosted). Os sites vivem no **monorepo** `sites-clientes` (1 pasta por cliente; arquivos web em `<slug>/public/`, docs internos na raiz — o Coolify serve só `public/`, então o financeiro nunca vaza).

**Preview p/ o cliente (grátis, sem comprar domínio):**
```
powershell -File C:\Users\Windows\Documents\Projetos\sites-clientes\_scripts\novo-cliente.ps1 -Slug <slug>
```
→ `git push` + cria o app no Coolify (via API) + publica em `https://<slug>.<IP-do-servidor>.sslip.io` com SSL automático (Let's Encrypt via sslip.io). É **esse** o link que vai pro cliente. Enquanto preview, o site tem `noindex`. Pré-req: túnel do Coolify de pé (`localhost:9000`; reabrir: `ssh -N -L 9000:localhost:8000 -L 6001:localhost:6001 root@<IP-do-servidor>`).

**Produção (cliente aprovou + pagou):** registra o domínio real dele no Registro.br apontando pro IP `<IP-do-servidor>` → no Coolify, troca o domínio do app pro real → **remove o `noindex`** + preenche `og:url`/`og:image` → Redeploy.

> Curinga (`*`) NÃO dá no Registro.br (não aceita `*`); por isso o preview usa **sslip.io** (zero DNS). O `deploy-hetzner.sh` (nginx manual) é **legado** — não usar, conflita com o proxy do Coolify. Alternativas de preview sem infra (só se o Coolify estiver fora): Netlify Drop / Surge.

> Antes de mandar o link, alinhe com o cliente o que ainda é **placeholder** (endereço/horário "a confirmar", depoimentos de exemplo) pra não passar impressão de inacabado.
