FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install


COPY src/ src/
COPY prisma/ prisma/

RUN npm run prisma
RUN npm run build

CMD ["npm", "run", "prod"]

