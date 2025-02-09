FROM node:20-alpine

WORKDIR .
COPY package*.json ./
RUN npm install --production
COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start:prod" ]