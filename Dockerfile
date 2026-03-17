FROM nginxinc/nginx-unprivileged:stable-bookworm

RUN printf "server {\n    listen 8080;\n    listen [::]:8080;\n    server_name _;\n\n    root /usr/share/nginx/html;\n    index index.html;\n\n    location / {\n        try_files \$uri \$uri/ /index.html;\n    }\n}\n" > /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY components /usr/share/nginx/html/components
COPY pages /usr/share/nginx/html/pages

EXPOSE 8080

CMD ["nginx","-g","daemon off;"]
