#!/bin/sh
set -e

envsubst '${PORT}' < nginx.conf > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'