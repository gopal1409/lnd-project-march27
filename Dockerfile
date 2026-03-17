FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets
COPY components /usr/share/nginx/html/components
COPY pages /usr/share/nginx/html/pages
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
