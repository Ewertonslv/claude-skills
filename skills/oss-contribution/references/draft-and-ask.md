# Draft-and-ask (escape hatch para fallout semantico)

Quando o fix "obvio" tem consequencia semantica que so o maintainer pode decidir, NAO force o CI
verde regenerando expectativas. Converta o PR pra DRAFT e faca uma pergunta de design objetiva.

## Quando usar

- Quebra de exaustividade que exige mudar comportamento de varios consumidores.
- Churn grande de snapshot que reflete **mudanca de comportamento** (nao so formatacao).
- Reclassificacao via builder/dispatcher (ex.: uma part muda de response->request).
- Alargamento de union/assinatura compartilhada com efeito cross-cutting.
- Dois comportamentos "corretos" em tensao, sem o repo ter decidido o canonico.

Em todos: regenerar snapshots/expectativas pra passar o CI **mascararia** a regressao. Nao faca.

## O que fazer

1. **Converter pra DRAFT** (confirm-gate):
   ```
   gh pr ready <num> --repo OWNER/REPO --undo
   ```
2. **Postar um comentario de pergunta de design** (confirm-gate), com:
   - o que o fix minimo resolve (com prova),
   - a consequencia exata (com `file:linha` e o mecanismo-raiz — ex.: "MessagesBuilder.add classifica por pertenca ao union primeiro, entao adicionar o membro reclassifica X"),
   - a pergunta com opcoes claras: "(a) tornar first-class request part — eu completo adapters+snapshots; (b) manter response-only e corrigir a persistencia de outro jeito",
   - oferta de empurrar qualquer das direcoes.
3. **Esperar a direcao** antes de empurrar a mudanca ampla.

## Precedente

pydantic-ai #6048: o "fix de uma linha" do bot quebrou 8 snapshots + exaustividade do pyright.
Em vez de regenerar, viramos DRAFT e perguntamos a direcao — transformou um PR vermelho numa
discussao de design util, posicionando o autor como contribuidor cuidadoso.

## Por que isso e senior

Bulldozer de snapshot pra "ficar verde" e o oposto da credibilidade. Entregar o diagnostico de
raiz + a pergunta certa vale mais e respeita que a decisao e do dono do codigo.
