# Utiliza una imagen de Node.js
FROM ubuntu:20.04

# Define una variable de entorno para evitar interacciones interactivas
ENV DEBIAN_FRONTEND=noninteractive

# Actualiza y luego instala las dependencias del sistema
RUN apt-get update && apt-get install -y \
    gconf-service \
    libgbm-dev \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget
  




# Instala Node.js usando el repositorio de nodesource
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs npm



# Crea el directorio de trabajo y copia el archivo package.json
WORKDIR /usr/src/app
COPY package*.json ./


# Instala las dependencias de Node.js (incluso las de desarrollo)
RUN npm install


# Instala nodemon globalmente
RUN npm install -g nodemon

# Copia todos los archivos de tu aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación escuchará
EXPOSE 3000

# Define el comando para iniciar la aplicación con nodemon
CMD [ "npm", "run", "dev"]

