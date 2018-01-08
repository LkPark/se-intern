FROM node:8.9.4

ARG NODE_ENV=production
ARG PORT=80

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR /app

COPY . .

RUN npm install

CMD npm run server:prod