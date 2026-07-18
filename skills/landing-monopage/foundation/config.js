/*
  config.js — a ÚNICA parte por-cliente do JS. Carregado antes do script.js.

  O script.js é byte-idêntico em todos os sites (sincronizado por
  _scripts/sync-foundation.ps1); tudo que muda de cliente pra cliente mora aqui.
*/
window.SITE_CONFIG = {
  WHATSAPP: '55XXXXXXXXXXX',   // 55 + DDD + número, só dígitos (ex: 5584996888662)
  INSTAGRAM: '',               // https://instagram.com/handle  (vazio = esconde o link)
  MSG: 'Olá! Vim pelo site e gostaria de mais informações.',
};
