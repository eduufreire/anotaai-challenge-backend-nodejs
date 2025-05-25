FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install

COPY src/ /app/src/
RUN npm run build

EXPOSE 9999
CMD [ "npm", "run", "prod" ]