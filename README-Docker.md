# Déploiement de l'Application de Gestion de Courriers avec Docker

## Prérequis
- Docker installé sur votre système
- Docker Compose installé

## Instructions de déploiement

### Option 1: Utilisation de Docker Compose (Recommandée)

1. **Cloner ou naviguer vers le dossier du projet**
   ```bash
   cd c:\gestiocourrrier\GestionDEcourriersWEB
   ```

2. **Construire et démarrer l'application**
   ```bash
   docker-compose up -d --build
   ```

3. **Accéder à l'application**
   - Ouvrir votre navigateur
   - Aller à: `http://localhost:8080`

4. **Arrêter l'application**
   ```bash
   docker-compose down
   ```

### Option 2: Utilisation de Docker directement

1. **Construire l'image Docker**
   ```bash
   docker build -t gestion-courriers .
   ```

2. **Démarrer le conteneur**
   ```bash
   docker run -d -p 8080:80 --name gestion-courriers-app gestion-courriers
   ```

3. **Accéder à l'application**
   - Ouvrir votre navigateur
   - Aller à: `http://localhost:8080`

4. **Arrêter le conteneur**
   ```bash
   docker stop gestion-courriers-app
   docker rm gestion-courriers-app
   ```

### Commandes utiles

- **Voir les conteneurs en cours d'exécution**
  ```bash
  docker ps
  ```

- **Voir les logs du conteneur**
  ```bash
  docker logs gestion-courriers-app
  ```

- **Accéder au conteneur en mode interactif**
  ```bash
  docker exec -it gestion-courriers-app sh
  ```

### Structure des fichiers Docker
- `Dockerfile`: Définit comment construire l'image Docker
- `docker-compose.yml`: Configure et orchestre le déploiement
- `.dockerignore`: Spécifie les fichiers à ignorer lors de la construction

### Notes importantes
- L'application sera accessible sur le port 8080
- Les fichiers statiques (HTML, CSS, JS, images) sont servis par nginx
- Le conteneur redémarre automatiquement en cas d'arrêt inattendu
