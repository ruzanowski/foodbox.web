FROM node:12.16.1-alpine As builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install
RUN npm install --save-dev @angular/cli@latest

COPY . /app

RUN ng build --output-path=dist --prod --env=prod

############
### prod ###
############

# base image
FROM nginx:1.19.2-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
