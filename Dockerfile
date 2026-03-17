FROM nginxinc/nginx-unprivileged:stable-bookworm

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY components /usr/share/nginx/html/components
COPY pages /usr/share/nginx/html/pages

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
