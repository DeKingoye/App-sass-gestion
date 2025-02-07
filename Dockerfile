# # Étape 1 : Utiliser une image de base officielle de Node.js
# FROM node:18-alpine AS builder

# # Créer le dossier de l’application
# WORKDIR /app

# # Copier les fichiers nécessaires
# COPY package*.json ./
# COPY prisma ./prisma
# COPY . .

# # Installer les dépendances
# RUN npm install

# # Générer Prisma client et build l’application
# RUN npx prisma generate
# RUN npm run build

# # Étape 2 : Utiliser une image légère de production
# FROM node:18-alpine AS production

# WORKDIR /app

# # Copier les fichiers depuis la première étape
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/prisma ./prisma

# # Commande Prisma pour déployer les migrations
# CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

# # Exposer le port
# EXPOSE 3000


# Étape 1 : Utiliser une image de base officielle de Node.js
FROM node:18-alpine AS builder

# Créer le dossier de l’application
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY prisma ./prisma
COPY . .

# Installer les dépendances
RUN npm install

# Générer Prisma client et build l’application
RUN npx prisma generate
RUN npm run build

# Étape 2 : Utiliser une image légère de production
FROM node:18-alpine AS production

WORKDIR /app

# Installer les outils nécessaires pour PostgreSQL et Prisma
RUN apk add --no-cache postgresql-client bash

# Copier les fichiers depuis la première étape
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Définir les variables d'environnement nécessaires
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://ordian:mI2mona.@35.195.147.151:5432/my_database

# Commande Prisma pour exécuter les migrations et démarrer l'application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

# Exposer le port
EXPOSE 3000
