FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . . 

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
