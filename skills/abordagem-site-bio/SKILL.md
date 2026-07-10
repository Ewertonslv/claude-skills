---
name: abordagem-site-bio
description: >-
  Gera UMA mensagem pronta de abordagem (DM de Instagram, PT-BR) para vender
  sites/landing pages de uma tela pro link da bio de perfis comerciais. A skill
  diagnostica o link atual da bio do cliente (Linktree, perfil cru, WhatsApp
  solto, site amador ou nada) e escreve uma mensagem que gera NECESSIDADE e
  passa PROFISSIONALISMO — mostrando que uma página própria transmite seriedade,
  gera confiança e recupera a venda que hoje escorre. Use SEMPRE que o usuário
  quiser abordar/prospectar um cliente no Instagram, pedir uma mensagem de venda
  de site, mandar "monta a DM pra fulano", "cria a abordagem pra esse @", "quero
  vender site pra esse perfil", ou passar um @ / print / link de bio pedindo pra
  escrever a mensagem. Dispare mesmo que ele não diga a palavra "skill" — basta
  o contexto de prospecção de site no Instagram.
---

# Abordagem de venda de site pra link da bio

Gera **uma** mensagem de DM pronta pra copiar e colar. O objetivo não é ser
simpático — é fazer o cliente **sentir que precisa disso**: entender que hoje ele
passa uma imagem amadora e perde venda por causa disso, e que uma página própria
resolve. Direto, humano, focado no mundo dele.

## Dados fixos do vendedor (EDITE AQUI se mudar)

Entram em (quase) toda mensagem. Se o usuário pedir pra ajustar, atualize aqui.

- **Assinatura:** `— Ewerton, monto páginas de bio que dão cara profissional e vendem`
  (pode encurtar pra "— Ewerton" quando a mensagem já estiver longa)
- **Exemplo no ar (prova):** `drrodrigodantas.app.br`
- **Oferta sem risco:** "monto a sua de graça pra você ver" — sempre presente, tira o medo de dizer sim.
- **Produto:** página de uma tela só, com a cara da marca (foto/logo, produtos ou serviços, localização, botão direto pro WhatsApp) pro link da bio.

Se algum desses dados faltar ou parecer desatualizado numa conversa real, pergunte ao
usuário antes de escrever — não invente link nem nome.

## Os 3 pilares (TODA mensagem tem que carregar os três)

Esse é o coração da skill. Uma mensagem que não gera necessidade e não passa
credibilidade não converte — foi o erro a evitar. Toda mensagem tem que fazer o
cliente sentir os três:

1. **Profissionalismo (o pilar central).** Uma página própria, com a cara da marca,
   **transmite seriedade** — é o que separa "loja onde eu compro tranquila" de
   "parece amador, será que é confiável?". Quem chega no perfil decide em **segundos**
   se confia. Um Linktree/linklist genérico ou um perfil cru grita "amador" e derruba
   essa confiança. Nomeie isso: a página profissional faz o *cliente dele* confiar.

2. **Necessidade (a conta que escorre agora).** Não venda "ficaria mais bonito".
   Mostre a **venda que ele perde todo dia** por causa da fricção/desconfiança: o
   cliente que esfria no meio da DM, que desiste de procurar o contato, que não confia
   e vai embora. Traga a consequência concreta — "essa venda você nem viu acontecer".
   Isso gera urgência real, sem prometer número que não dá pra garantir.

3. **Credibilidade do vendedor.** O Ewerton soa profissional quando **mostra que
   entende o negócio do cliente** — nomeando a dor exata daquele nicho (varejo de
   impulso, agenda, procedimento, etc.), não se gabando. Isso + o exemplo no ar
   (`drrodrigodantas.app.br`, enquadrado como algo feito pra passar seriedade e vender)
   fazem ele parecer alguém que sabe o que faz.

## Como rodar (fluxo híbrido)

O usuário vai te dar um `@`, uma URL de bio, um print, ou só o nicho. Descubra
**como está o link da bio hoje** e escreva em cima disso.

### Passo 1 — Diagnosticar o link atual (tente sozinho, senão pergunte)

1. **Se veio uma URL** (o link que está na bio): use `WebFetch` nela e classifique
   (ver categorias abaixo). Mais confiável — Linktree, linklist, Beacons, Wix etc. são públicos.
2. **Se veio só o `@`:** tente `WebFetch` em `https://instagram.com/<handle>`. O
   Instagram costuma bloquear/exigir login — **não insista**. Se falhar, vá pro passo 3.
3. **Se veio um print:** leia a bio, o link, nº de seguidores e o tipo de negócio na imagem.
4. **Se não descobriu:** faça UMA pergunta curta — "O link da bio dele vai pra onde
   hoje? (Linktree/linklist, WhatsApp direto, um site, ou não tem link)". Com a resposta, siga.

Nunca trave o fluxo. Uma tentativa; se não achou, pergunta e segue.

### Passo 2 — Escrever UMA mensagem

Combine o pilar de profissionalismo com o gancho da categoria diagnosticada, e siga a
estrutura abaixo. Entregue **só a mensagem final**, pronta pra colar (a não ser que o
usuário peça a análise). Se souber o nicho e algum detalhe real do perfil (preço,
localização, nº de seguidores), use pra deixar a necessidade concreta.

## Categorias de diagnóstico → gancho

O gancho nomeia a fraqueza real e já puxa pro profissionalismo:

| Situação da bio hoje | Gancho (fraqueza + ângulo de profissionalismo) |
|---|---|
| **Linktree / linklist / Beacons / bio.link / Campsite** | Um agregador genérico com a marca de outra empresa passa amador e derruba a confiança de quem chega. Uma página própria com a cara da marca transmite seriedade e faz o cliente confiar. |
| **Só o perfil (sem link nenhum)** | Sem link, o cliente tem que caçar o contato e desiste no caminho — e a falta de uma página passa "não tão profissional". Você perde venda todo dia sem ver. |
| **wa.me / WhatsApp direto (sem página)** | Cai num chat cru, sem apresentação, sem passar credibilidade. Não vende nem posiciona a marca antes da conversa. Uma página apresenta você com cara profissional e aí sim manda pro WhatsApp. |
| **Site amador (subdomínio wix/.wixsite, template tosco, lento no celular)** | Tem site, mas ele passa imagem menos profissional do que a marca é — e lento no celular ninguém espera. Uma página rápida e com a cara certa recupera essa credibilidade. |
| **Já tem site próprio bom (domínio próprio, rápido, profissional)** | Provável que NÃO seja lead ideal. Avise o usuário. Se ele ainda quiser abordar, ofereça uma melhoria pontual concreta, sem criticar o que já está bom. |

## Estrutura da mensagem

Ordem: **profissionalismo + fraqueza atual → a conta que escorre → oferta (página com a
cara da marca) → prova → oferta grátis + CTA → assinatura**.

1. **Abertura (1-2 linhas):** nomeie a fraqueza do link atual e amarre no
   profissionalismo — quem chega decide em segundos se confia, e o que ele tem hoje
   passa amador. "Você/seu" domina, nada de "eu/minha empresa".
2. **A conta que escorre (1-2 linhas):** a venda perdida concreta por causa disso —
   o cliente que esfria, desiste, não confia. Traga a consequência ("essa venda você
   nem viu acontecer").
3. **Oferta (1 linha):** página de uma tela **com a cara da marca** (produtos/serviços,
   localização, botão que abre o WhatsApp na hora) → o cliente clica, confia e já pede.
4. **Prova (1 linha):** o exemplo no ar (`drrodrigodantas.app.br`), enquadrado como
   feito pra passar seriedade e vender no celular.
5. **Oferta grátis + CTA (1 linha):** "monto a sua de graça, com a cara da [marca], pra
   você ver funcionando" + **um** pedido de baixo atrito ("Bora?" / "Topa ver pronta?").
6. **Assinatura:** a assinatura que posiciona o Ewerton como especialista.

Alvo: **5 a 8 linhas**. Precisa de fôlego pra gerar necessidade, mas não vire um textão —
toda frase empurra pra resposta; se não empurra, corta.

## Regras de voz (por que importam)

- **Gere necessidade, não só simpatia.** Uma mensagem gentil que não faz o cliente sentir
  que precisa disso não converte. Ele tem que enxergar a perda que já está acontecendo.
- **Credibilidade = demonstrar que entende o negócio dele.** Nomeie a dor exata do nicho.
  Isso vale mais que qualquer adjetivo sobre você.
- **Mundo dele primeiro.** "Você/seu" domina. Abrir falando de você manda o dedo pro "arquivar".
- **Soe humano, confiante, sem hype.** Contrações e fala natural ("tá", "pra"), mas com
  postura de quem sabe o que faz — nada de pedir desculpa ou parecer inseguro. Evite
  "prezado", "venho por meio desta", "solução", "alavancar", "melhor do mercado".
- **Personalização tem que grudar no problema.** Se apagar a primeira linha e a mensagem
  seguir igual, não está funcionando. O gancho sai do diagnóstico daquele perfil.
- **Um pedido, baixo atrito.** "Bora?" bate "vamos marcar 30 min?". Nunca peça call na primeira.
- **Varie sempre a abertura entre clientes.** Texto idêntico em massa o Instagram detecta
  (limita alcance) e o cliente sente o template.

## O que evitar

- Mensagem morna que só elogia e oferece — sem dor, sem necessidade (foi o erro a corrigir).
- Prometer número que você não controla ("vou dobrar seu faturamento"). Gere urgência pela
  perda **real e concreta** (venda que escorre), não por promessa inflada.
- Despejar features. Uma prova + a dor certa valem mais que dez recursos.
- Emoji demais (no máximo 1-2, e só se encaixar natural — ex: 👉 antes do link).
- Criticar de forma humilhante ("seu perfil tá péssimo"). Aponte a fraqueza com firmeza e
  respeito — o objetivo é abrir conversa e posicionar o valor, não ofender.

## Exemplos (diagnóstico → mensagem)

**Exemplo 1 — linklist/Linktree, loja de cosméticos (varejo de impulso)**
Diagnóstico: 12,2 mil seguidoras, produtos a R$10, link da bio num `linklist.bio`.
Saída:
> Você tem 12,2 mil seguidoras, mas o link da bio caindo num linklist genérico passa uma imagem amadora — e quem chega decide em segundos se a loja é séria o bastante pra comprar. Uma página própria, com a cara da loja, muda isso na hora: transmite profissionalismo e faz a cliente confiar.
>
> Monto uma página de uma tela com produtos, preços, localização e um botão que abre o seu WhatsApp na hora. A cliente clica, confia e já pede — em vez de esfriar no meio da DM e você perder a venda sem nem ver.
>
> Essa é minha e tá no ar 👉 drrodrigodantas.app.br — feita pra passar seriedade e vender no celular.
>
> Faço a de vocês de graça, com a cara da loja, pra você ver funcionando. Se curtir, a gente conversa. Bora?
>
> — Ewerton, monto páginas de bio que dão cara profissional e vendem

**Exemplo 2 — sem link nenhum, salão/estética**
Diagnóstico: perfil comercial sem link na bio.
Saída:
> Pra marcar contigo hoje a cliente tem que sair do post, caçar seu contato e torcer pra achar — e a falta de uma página própria passa "amador" pra quem tá decidindo se confia em você. Nesse caminho a maioria desiste, e é agenda vazia que você nem viu escorrer.
>
> Monto uma página de uma tela com a sua cara: seus serviços, localização e um botão que já abre o WhatsApp pra agendar. A cliente bate o olho, confia e chama.
>
> Exemplo meu no ar 👉 drrodrigodantas.app.br — feito pra passar seriedade e converter no celular.
>
> Faço a sua de graça pra você ver funcionando antes de decidir qualquer coisa. Bora?
>
> — Ewerton, monto páginas de bio que dão cara profissional e vendem

**Exemplo 3 — WhatsApp direto, profissional (dentista, advogado, personal)**
Diagnóstico: link da bio é um `wa.me` solto.
Saída:
> Seu link já manda pro WhatsApp, mas cai num chat cru — sem sua foto, sem seus serviços, sem nada que mostre que você é profissional antes da conversa começar. E hoje o cliente decide em segundos se confia; um zap seco não passa essa credibilidade.
>
> Monto uma página de uma tela que apresenta você com cara profissional — foto, serviços, prova — e aí sim manda pro WhatsApp já pronto pra falar. A pessoa chega confiando.
>
> Exemplo meu no ar 👉 drrodrigodantas.app.br
>
> Faço a sua de graça pra você ver a diferença. Topa?
>
> — Ewerton, monto páginas de bio que dão cara profissional e vendem

## Follow-up (só quando o usuário pedir)

2-3 dias depois, sem resposta. Adicione valor, não "e aí, viu?". Mostre que já adiantou algo:
> Fiz um rascunho rápido da sua página aqui, deu uns 30 segundos 😄 Quer que eu te mande o print pra você ver como a sua marca fica com cara de profissional?
