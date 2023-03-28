# Imagen de node versión 14, basada en una imagen oficial de node
FROM node:14

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación a /app
COPY . .

# Puerto en el que se ejecutará la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "run", "start:dev"]


# Inicializar base de datos MySQL
FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=12345678
ENV MYSQL_DATABASE=gestion_house
ENV MYSQL_USER=develop
ENV MYSQL_PASSWORD=Develop12345

COPY gestion_house.sql /docker-entrypoint-initdb.d/