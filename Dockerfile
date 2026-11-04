# Imagen oficial de Node.js ligera basada en Alpine Linux
FROM node:20-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar configuración del proyecto
COPY package.json ./

# Copiar el código fuente completo
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto
EXPOSE 3000

# Comando de inicio del servidor
CMD ["node", "server.js"]
