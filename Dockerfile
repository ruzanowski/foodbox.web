FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm install --save-dev @angular/cli@latest

COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
