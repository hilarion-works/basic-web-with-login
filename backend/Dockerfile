FROM node:lts

EXPOSE 8080

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev