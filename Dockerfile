# Pull latest node image from docker
FROM node:latest

LABEL maintainer='tundexmike@gmail.com'

# Creating ad work directory for the application
WORKDIR /usr/src/app

# copy package.json to install require dependencies
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install

# copy app into folder
COPY . .

# expose ports
EXPOSE 3000 8080 80 443

# start app
CMD ["npm", "start"]