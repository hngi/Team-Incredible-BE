# Pull node image from docker
FROM node:14.4.0-stretch

# Maintainer MichaelOlatunji @imyke 
MAINTAINER imykel

# Creating ad work directory for the application
WORKDIR /usr/src/app

# copy package.json to install require dependencies
COPY package*.json ./

# install dependencies
RUN yarn install

# copy app into folder
COPY . .

# expose ports
EXPOSE 3000 8080 80 443

# start app
CMD ["yarn", "start"]