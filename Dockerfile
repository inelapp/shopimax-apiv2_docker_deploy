FROM node:18-alpine as dependecies

WORKDIR /app

# Instalar tzdata para manejar zonas horarias
RUN apk add --no-cache tzdata
# Configurar la zona horaria
ENV TZ=America/Lima
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

ENV PORT=3002

EXPOSE $PORT

CMD ["yarn", "dev"]