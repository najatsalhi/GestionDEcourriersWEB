# Utiliser l'image officielle nginx
FROM nginx:alpine

# Copier tous les fichiers de l'application dans le répertoire nginx
COPY . /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80

# La commande par défaut de nginx démarre automatiquement
CMD ["nginx", "-g", "daemon off;"]
