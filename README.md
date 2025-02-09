## Github : https://github.com/RafaelCoppe/5IW2_clean_code

# Lancer le projet

1. Construire les images :

  ```sh
  docker-compose build --no-cache
  ```

2. Lancer `npm install` dans tous les projets :

  ```sh
  cd services/service && npm install
  cd ../../frontends/main && npm install
  ```

3. Créer les conteneurs :

  ```sh
  docker compose up -d
  ```

4. Attendre que la base de données se crée (une quinzaine de secondes).
5. Lancer le seeding :

  ```sh
  cd ../../services/service && npm run seeding
  ```

# Si besoin de mettre à jour la base de données

1. Supprimer les conteneurs 'postgres' et 'service'
2. Supprimer le volume utilisé par 'postgres' ('Nom du dossier local' + 'postgres_data')

Si besoin, reconstruire les conteneurs nécéssaires :

```sh
  docker-compose build --no-cache {conteneur}
```

3. Recréer les conteneurs

```sh
  docker compose up -d
```

# Comptes utilisateur : 
Concessionnaire : 

```sh
  email: jeandruet@voituresdruet.com
  password: password123
```

Partenaire :

```sh
  email: henry.didier.livraison@gmail.com
  password: password123
```
