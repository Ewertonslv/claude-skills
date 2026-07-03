# Cenário — cliente novo, do primeiro contato ao anúncio no ar

O fluxo operacional completo. Cada cliente = pasta em `sites-clientes/<slug>/` com
`cliente.yaml` (dados) + `STATUS.md` (estágio e gates). A skill lê os dois e só executa
o que o estágio permite.

## Os dois momentos do marketing (regra de ouro)

1. **Marketing pra CONSEGUIR o cliente** — roda ANTES de existir página:
   `prospecting` (lista de negócios locais sem site/site fraco) → `cold-email`/WhatsApp
   (abordagem) → `offers` (empacotar site+hospedagem+tráfego).
2. **Marketing DO cliente** — `copywriting`/`cro` já rodam **no rascunho** (não dependem
   de endereço real); **`ads`/tráfego SÓ com site publicado** (domínio no ar, dados reais,
   TCLE, pixel). Anúncio pra página com "a confirmar" queima verba e credibilidade.

## Fluxo por estágio

### LEAD (pré-cliente)
`prospecting` monta a lista → abordagem → interessado? Cria a pasta:
`sites-clientes/<slug>/` + copiar `templates/cliente.yaml` e `templates/STATUS.md`.

**A "digital" do prospect ideal** (calibrada no cliente real nº 1 — perfil de Instagram):
1. link de **agregador** na bio (bio.site/linktree/beacons) no lugar de site próprio — sinal nº 1;
2. **categoria errada** no perfil (ex.: "Digital creator" num dentista) = ninguém profissionalizou;
3. serviços espremidos no texto da bio = precisa de vitrine;
4. **ativo**: posts frequentes + destaques organizados (investe em imagem);
5. ratio seguidores/seguindo ~1:1 = crescendo no braço, receptivo a alavanca.
4 de 5 = Hot. Garimpo: Google Maps (ficha sem site), hashtags locais no IG,
`site:linktr.ee <nicho> <cidade>` no Google. Sem scraping — caça manual assistida.
Fechamento do ciclo: site publicado → trocar o agregador da bio pelo domínio próprio
(o perfil do cliente vira prova social para os colegas do nicho que o seguem).

### BRIEFING — roteiro de perguntas (cole no WhatsApp, mapeia 1:1 no yaml)

> Pra montar seu site, me responde rapidinho:
> 1. Nome completo como aparece na placa/cartão? E registro profissional (CRO/OAB/etc.)? → `nome`, `credencial`
> 2. Quais serviços você oferece? (os 4-7 principais) → `servicos`
> 3. Número do WhatsApp de atendimento (com DDD)? Tem telefone fixo? → `whatsapp`, `telefone`
> 4. Instagram do negócio? → `instagram`
> 5. Endereço e horário de atendimento? → `endereco`, `horario`
> 6. Me manda: uma foto sua profissional + fotos de trabalhos/resultados → `fotos`
> 7. (saúde) Essas fotos de pacientes têm autorização por escrito? → `autorizacao_tcle`
> 8. Tem alguma cor/logo que já usa? → `marca.cor`
> 9. Já tem domínio (www.seunome.com.br)? Quer que eu registre? → `dominio`
> 10. Se tiver 2-3 depoimentos de clientes (com permissão de nome), me manda → `depoimentos`

Preencheu o yaml (mínimo: nome, profissao, cidade, whatsapp, servicos) → estágio RASCUNHO.

### RASCUNHO (o dia de build — tudo numa sessão)
```
/landing-monopage --manifest sites-clientes/<slug>/cliente.yaml
```
A skill roda o pipeline inteiro sem entrevistar: ficha+arquétipo+combo → gera site →
fotos (recortes) → `copywriting` (headline/CTA) → **impeccable** (design) → **cro**
(conversão) → screenshots desktop+mobile. Envie o preview ao cliente (screenshots por
WhatsApp; se quiser link: Netlify Drop temporário). Commit no `sites-clientes`.

### APROVAÇÃO
Cliente aprovou → enviar **proposta** (gerada de `proposta-e-deploy.md` com os dados do
manifest) → fechar valores → cobrar os dados finais (endereço/horário/TCLE/depoimentos)
→ registrar domínio (registro.br) e apontar pro VPS.

### PUBLICADO
```
scripts/deploy-hetzner.sh sites-clientes/<slug> <dominio>
```
(upload + vhost nginx + certbot/SSL; config SSH em `~/.config/landing-deploy.env`).
Pós-deploy: og:url/og:image com a URL real, Google Meu Negócio, teste no celular.
Marcar gates no STATUS.md.

### TRÁFEGO
Gate duro: PUBLICADO + TCLE + pixel instalado/testado + BM com seu acesso + cartão do
cliente. Aí sim: `PLANO-TRAFEGO.md` (copiar padrão do dr-rodrigo-dantas) + campanha
conforme `trafego-pago.md`, aprofundando com `ads`/`ad-creative`/`analytics`.
Rotina semanal + relatório mensal = a mensalidade de gestão.

## Regras do fluxo
- **Nunca pule gate** (especialmente TRÁFEGO sem TCLE/pixel — risco real de conta restrita).
- Estágio mudou → atualizar `STATUS.md` (linha do estágio + checkboxes + log) e commitar.
- Manifest é a fonte da verdade: dado novo do cliente entra no `cliente.yaml` primeiro,
  site é regenerado/ajustado a partir dele.
- Cliente parado > 30 dias em BRIEFING/APROVAÇÃO → follow-up (ou marcar como frio no log).
