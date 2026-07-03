# Tráfego Pago — playbook do serviço (gestor iniciante)

A 3ª perna do negócio: **site (único) + hospedagem (mensal) + tráfego (mensal)**.
Guia passo-a-passo para quem nunca gerenciou campanha. Fase 1 = Meta Ads (Instagram/Facebook);
fase 2 = Google Search.

> Preços/custos mudam rápido. Antes de fechar proposta, rode `WebSearch`
> ("quanto cobra gestor de tráfego <ano>", "CPL <nicho> Meta Ads Brasil <ano>").
> Números abaixo = pesquisa BR jan-jul/2026.

## 1. Oferta e preços (mercado 2026)

| Item | Mercado | Sugestão p/ começar |
|---|---|---|
| Gestão mensal (iniciante, 1 conta) | R$ 500–1.500/mês | **R$ 500–800/mês** (sobe com resultados/casos) |
| Setup inicial (contas, pixel, 1ª campanha) | embutido ou R$ 300–800 | **R$ 400** (ou grátis no combo) |
| Verba de anúncio | **à parte, paga pelo cliente** | R$ 600–1.500/mês p/ negócio local (1 plataforma) |
| Modelo alternativo | 10% da verba investida | só faz sentido com verbas > R$ 5k |

**Regras do modelo:**
- Verba ≠ honorário. O cliente paga a plataforma **direto no cartão dele**; você cobra só a gestão.
- **Conta, página, pixel e histórico são do cliente** (Business Manager dele; você entra como parceiro/anunciante). Se o contrato acabar, o ativo fica com ele — isso é argumento de venda, não perda.
- Verba < R$ 2.000/mês → **uma plataforma só** (Meta primeiro em nicho visual). As duas juntas só acima disso.
- **Nunca prometa resultado** ("X pacientes/mês"). Prometa processo: campanhas no ar, otimização semanal, relatório mensal.

## 2. Pré-requisito no site — rastreamento

Antes de qualquer anúncio, o site precisa medir conversão. Na foundation, a conversão é o **clique no CTA de WhatsApp**:
- Snippet do **Meta Pixel** no `<head>` (placeholder até existir a conta).
- Evento `Contact` disparado no clique dos CTAs (função com **guard** `typeof fbq === 'function'` — o site nunca quebra sem pixel).
- Fase 2: mesmo padrão com `gtag` (Google).

## 3. Setup Meta passo-a-passo (uma vez por cliente)

1. **Cliente cria** (com você guiando por chamada/presencial): conta no [business.facebook.com](https://business.facebook.com) → Business Manager **no nome/CNPJ dele**.
2. Vincular a **Página do Facebook** e o **Instagram profissional** do cliente ao Business Manager.
3. Criar a **conta de anúncios** (moeda BRL, fuso America/Recife) e cadastrar **o cartão do cliente**.
4. Cliente te adiciona como **parceiro** (Configurações do negócio → Parceiros → adicionar pelo ID do seu BM) ou como pessoa com função "Anunciante". Você gerencia sem ser dono.
5. Criar o **Pixel/Conjunto de dados** (Gerenciador de eventos) → copiar o ID → colar no snippet do site → publicar → testar com a extensão "Meta Pixel Helper" (evento `PageView` + `Contact` no clique do botão).
6. Configurar **domínio verificado** (se houver domínio próprio) e API de conversões fica pra depois (avançado).

## 4. Estrutura da 1ª campanha local (Meta)

```
Campanha: [Cidade] Agendamentos — objetivo "Engajamento > Mensagem" (WhatsApp)
           (alternativa: "Leads" ou "Tráfego p/ site" se quiser medir pelo pixel)
├── Conjunto A — Raio local: cidade + 10-15km, 25-55 anos, sem interesse (aberto)
├── Conjunto B — Interesses: estética/beleza/cuidado pessoal, mesmo raio
└── (depois) Conjunto C — Remarketing: visitantes do site 30d (exige pixel rodando)
Orçamento: R$ 20-35/dia total no início · CBO ligado · deixar 7 dias SEM mexer (aprendizado)
```

**3-4 criativos por conjunto** (vídeo curto vence):
1. Vídeo do profissional falando direto pra câmera (15-30s): quem é, o que resolve, chamada pro WhatsApp.
2. Foto/vídeo do espaço + serviço acontecendo (sem gore/tecido biológico).
3. Depoimento (texto sobre imagem ou vídeo do cliente, autorizado).
4. Resultado finalizado (ex.: sorriso pronto, cabelo pronto) — **sem comparação lado a lado** (ver compliance).

**Texto do anúncio:** problema → solução → CTA ("Chama no WhatsApp e agende sua avaliação"). Sem promessa, sem "resultado garantido", sem preço de procedimento de saúde regulado.

## 5. Rotina de gestão (o que você faz pra merecer a mensalidade)

**Semanal (30-60 min/cliente):**
- [ ] Verba gastando? Anúncio reprovado? Saldo do cartão ok?
- [ ] CPL/custo por conversa: dentro do alvo? (saúde especializada BR: R$ 40–200/lead qualificado; serviços locais gerais: R$ 8–35 form nativo, R$ 15–80 via site)
- [ ] Frequência > 3 → criativo fadigado: trocar imagem/vídeo/gancho.
- [ ] Regra: conjunto com CPL 2× pior que o melhor, por 7+ dias → pausa; melhor conjunto → +20% de verba (nunca dobrar de uma vez).
- [ ] Perguntar ao cliente: "os contatos que chegaram viraram agendamento?" (o funil termina no WhatsApp DELE).

**Mensal — relatório simples (1 página, WhatsApp ou PDF):**
```
Período · Verba investida · Conversas iniciadas · Custo por conversa
Melhor anúncio (print) · O que faremos mês que vem (2-3 bullets)
```

## 6. Fase 2 — Google Search (quando: verba ≥ R$ 2k/mês OU Meta estabilizado)

Campanha de pesquisa local: palavras de intenção ("dentista natal", "facetas natal", "advogado trabalhista natal"), correspondência de frase, raio local, extensões (chamada, local, sitelinks), conversão = clique WhatsApp (gtag). CPC saúde local é caro — comece com termos específicos do serviço, não genéricos.

## 7. Compliance (saúde/regulados) — LEIA antes de subir criativo

| Regra | O que significa na prática |
|---|---|
| **Meta — política de saúde**: proíbe **antes/depois lado a lado**, zoom em parte do corpo, resultado improvável, imagem corporal negativa | Antes/depois pode ficar **no site** (CFO permite com TCLE), mas **não no criativo do anúncio**. Use resultado finalizado, vídeo do profissional, depoimento. |
| **CFO 196/2019** (odontologia) | Antes/depois só pelo profissional que executou + **TCLE por escrito** do paciente. Proibido: procedimento em execução, tecidos biológicos, título que não possui. CFO 271/2025 liberou promoções/descontos com ética. |
| **OAB Provimento 205/2021** (advogados) | Publicidade sóbria; **sem promessa de resultado**, sem captação sensacionalista. Anúncio de conteúdo/institucional ok; "ganhe sua causa" não. |
| **CFM/CFP/CRN...** | Cada conselho tem regra própria — cheque a ficha da profissão no design-system antes de anunciar saúde. |
| **LGPD** | Pixel coleta dados → site com aviso simples de cookies/privacidade quando o pixel entrar. |

## 8. Red Flags — PARE

| Tentação | Realidade |
|---|---|
| "Prometo X clientes/mês pra fechar o contrato" | Você não controla o algoritmo nem o atendimento do cliente. Prometa processo, não resultado. |
| "Anúncio de antes/depois converte mais, vou tentar" | Reprovação + risco de restrição da conta **do cliente**. Não vale. |
| "Coloco no meu cartão e o cliente me reembolsa" | Fluxo de caixa seu virando risco. Cartão do cliente, sempre. |
| "Mexo na campanha todo dia" | Aprendizado resetado = CPL pior. 7 dias de paciência no início. |
| "O lead chegou, meu trabalho acabou" | Se o cliente não responde o WhatsApp em minutos, o CPL "piora" sem culpa do anúncio. Eduque o cliente sobre atendimento. |

## 9. Checklist de onboarding de cliente novo (resumo)

1. Site no ar com rastreamento (§2) · 2. Setup de contas (§3) · 3. Definir verba com o cliente (§1)
4. Gravar/coletar criativos (§4) · 5. TCLE/autorizações de imagem · 6. Subir campanha · 7. Rotina (§5)
