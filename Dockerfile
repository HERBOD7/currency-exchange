FROM node:14-alpine AS dev
ENV NODE_ENV dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]