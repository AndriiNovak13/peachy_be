# Build
FROM node:20 AS build
WORKDIR /build

COPY package*.json ./
COPY . .

RUN yarn install

RUN yarn build

# Application
FROM node:20

WORKDIR /app

COPY --from=build /build/dist ./dist/
COPY --from=build /build/node_modules ./node_modules/
COPY --from=build /build/package.json .

RUN rm -rf /build

EXPOSE 3000/tcp

CMD ["yarn", "start"]
