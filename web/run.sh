#!/bin/sh
set -e

envsubst '${PORT}' < nginx.conf > /etc/nginx/conf.d/default.conf
echo "Running Nginx..."
nginx -g 'daemon off;'