# STATUS — {{NOME}} ({{slug}})

**Estágio atual:** BRIEFING
_(atualize a linha acima e marque os gates conforme avança; a skill e o painel leem este arquivo)_
_(convenção: gate com **(cliente)** no fim = depende do cliente; sem marca = depende de você)_

## Estágios e gates

### 1. LEAD → BRIEFING
- [ ] Cliente respondeu e topou conversar (cliente)
- [ ] Roteiro de perguntas enviado (references/cenario-cliente-novo.md)

### 2. BRIEFING → RASCUNHO
- [ ] `cliente.yaml` preenchido (mínimo: nome, profissao, cidade, whatsapp, servicos)
- [ ] Fotos recebidas, ou combinado que virão depois (cliente)

### 3. RASCUNHO → APROVAÇÃO
- [ ] Site gerado (`/landing-monopage --manifest`)
- [ ] impeccable validado (design) + cro validado (conversão)
- [ ] Preview LIVE publicado (`novo-cliente.ps1` → link `sslip.io`, com noindex) e enviado ao cliente

### 4. APROVAÇÃO → PUBLICADO
- [ ] Cliente aprovou o visual (cliente)
- [ ] Proposta aceita — valores fechados (cliente)
- [ ] Dados finais no site: endereço, horário, depoimentos reais (cliente)
- [ ] TCLE/autorizações de imagem assinados — obrigatório saúde (cliente)
- [ ] Domínio registrado (registro.br) e apontado
- [ ] Produção: domínio real apontado + trocado no Coolify + **noindex removido** + SSL ok + og:url/og:image preenchidos

### 5. PUBLICADO → TRÁFEGO
- [ ] Business Manager do cliente + acesso de parceiro pra mim (cliente)
- [ ] Pixel criado e instalado (descomentar bloco no index.html + testar Pixel Helper)
- [ ] Domínio verificado no BM
- [ ] Criativos prontos (vídeo + fotos, SEM antes/depois lado a lado)
- [ ] Verba definida + cartão do cliente na conta (cliente)
- [ ] Campanha no ar (PLANO-TRAFEGO.md)

## O que roda em cada estágio

| Estágio | Liberado | Bloqueado |
|---|---|---|
| LEAD | prospecting, cold-email, offers | tudo do cliente |
| BRIEFING | roteiro de perguntas, proposta preliminar | gerar site (falta manifest) |
| RASCUNHO | gerar site, copywriting, impeccable, **cro**, **preview LIVE (sslip.io)** | produção (domínio real), tráfego |
| APROVAÇÃO | ajustes, proposta final, preparar domínio | tráfego |
| PUBLICADO | produção (domínio real), SEO local, Google Meu Negócio | anúncio só com TCLE+pixel |
| TRÁFEGO | ads, ad-creative, analytics, rotina semanal | — |

## Log
- {{DATA}}: cliente criado
