#!/usr/bin/env bash
# deploy-hetzner.sh — publica um site estático no VPS (nginx + certbot) em 1 comando.
# Uso:  ./deploy-hetzner.sh <pasta-local-do-site> <dominio> [--dry-run]
# Ex.:  ./deploy-hetzner.sh "sites-clientes/dr-rodrigo-dantas" drrodrigodantas.com.br
#
# Config (NUNCA commitar): ~/.config/landing-deploy.env
#   SSH_HOST="root@1.2.3.4"        # usuário@ip do VPS
#   SSH_PORT="22"                   # opcional (default 22)
#   CERTBOT_EMAIL="voce@email.com"  # e-mail do Let's Encrypt
#
# Pré-requisitos no VPS (uma vez): nginx + certbot instalados
#   apt update && apt install -y nginx certbot python3-certbot-nginx
# Pré-requisito no domínio: registro A apontando pro IP do VPS (registro.br → DNS).
# Idempotente: re-rodar atualiza os arquivos e mantém vhost/SSL.

set -euo pipefail

SITE_DIR="${1:?uso: deploy-hetzner.sh <pasta-local> <dominio> [--dry-run]}"
DOMAIN="${2:?informe o dominio, ex: drrodrigodantas.com.br}"
DRY_RUN="${3:-}"

CONF="$HOME/.config/landing-deploy.env"

if [ ! -d "$SITE_DIR" ]; then
  echo "ERRO: pasta não existe: $SITE_DIR" >&2; exit 1
fi
if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "ERRO: $SITE_DIR não tem index.html" >&2; exit 1
fi
# sanity: placeholders que não podem ir pro ar
if grep -q "55XXXXXXXXXXX" "$SITE_DIR/script.js" 2>/dev/null; then
  echo "ERRO: WhatsApp ainda é placeholder (55XXXXXXXXXXX) — preencha antes de publicar" >&2; exit 1
fi

if [ "$DRY_RUN" = "--dry-run" ]; then
  echo "== DRY RUN (nada será enviado) =="
  echo "Site local : $SITE_DIR ($(find "$SITE_DIR" -type f | wc -l) arquivos)"
  echo "Domínio    : $DOMAIN"
  echo "Config SSH : $CONF $( [ -f "$CONF" ] && echo '(existe)' || echo '(FALTA CRIAR)' )"
  echo "Passos que executaria:"
  echo "  1. tar da pasta local | ssh → /var/www/$DOMAIN"
  echo "  2. escrever /etc/nginx/sites-available/$DOMAIN (root=/var/www/$DOMAIN)"
  echo "  3. ln -s sites-enabled/ + nginx -t + systemctl reload nginx"
  echo "  4. certbot --nginx -d $DOMAIN -d www.$DOMAIN (SSL)"
  exit 0
fi

if [ ! -f "$CONF" ]; then
  echo "ERRO: crie $CONF com SSH_HOST=\"user@ip\" e CERTBOT_EMAIL=\"...\"" >&2; exit 1
fi
# shellcheck disable=SC1090
source "$CONF"
: "${SSH_HOST:?SSH_HOST faltando em $CONF}"
: "${CERTBOT_EMAIL:?CERTBOT_EMAIL faltando em $CONF}"
SSH_PORT="${SSH_PORT:-22}"

echo "== 1/4 Enviando arquivos para $SSH_HOST:/var/www/$DOMAIN =="
tar -C "$SITE_DIR" -czf - . | ssh -p "$SSH_PORT" "$SSH_HOST" \
  "mkdir -p /var/www/$DOMAIN && tar -C /var/www/$DOMAIN -xzf - && chown -R www-data:www-data /var/www/$DOMAIN"

echo "== 2/4 Configurando vhost nginx =="
ssh -p "$SSH_PORT" "$SSH_HOST" "cat > /etc/nginx/sites-available/$DOMAIN" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    root /var/www/$DOMAIN;
    index index.html;
    location / { try_files \$uri \$uri/ =404; }
    # cache leve para estáticos
    location ~* \.(css|js|jpg|jpeg|png|webp|svg|ico)\$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
NGINX

echo "== 3/4 Ativando vhost =="
ssh -p "$SSH_PORT" "$SSH_HOST" \
  "ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN && nginx -t && systemctl reload nginx"

echo "== 4/4 SSL (certbot) =="
ssh -p "$SSH_PORT" "$SSH_HOST" \
  "certbot --nginx --non-interactive --agree-tos -m '$CERTBOT_EMAIL' -d '$DOMAIN' -d 'www.$DOMAIN' --redirect || certbot --nginx --non-interactive --agree-tos -m '$CERTBOT_EMAIL' -d '$DOMAIN' --redirect"

echo "== OK: https://$DOMAIN no ar =="
echo "Checklist pós-deploy: abrir no celular · og:url/og:image com a URL real · Google Meu Negócio"
