FROM node:lts

EXPOSE 3000

WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev