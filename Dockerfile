FROM node:6-alpine

# Add bash support to the apline image
RUN apk add --no-cache bash

LABEL version="1.0"
LABEL description="Docker image for random english word service"
LABEL maintainer "Silveimar silverpaezp@gmail.com"

#Create and specify the WORKDIR for the application
RUN mkdir -p /www/node.english-words
WORKDIR /www/node.english-words

#COPY the package dependencies
COPY ["package.json", "./"]

# Add gulp package globally
RUN  yarn global add gulp

#Install dependencies
RUN cd /www/node.english-words && yarn

#COPY porject source code to docker image.
# Use the .dockerignore file for any file you don't want to copy to the image
COPY . .

#COPY the credentials configuration
COPY ["test/docker/docker-credentials", "./.env"]

#COPY wait-for-it.sh script. This script will poll a given host and port until it’s accepting TCP connections.
#See the https://docs.docker.com/compose/startup-order/ for furhter explanation
COPY ["test/docker/wait-for-it.sh", "./wait-for-it.sh"]
RUN ["chmod", "+x", "./wait-for-it.sh"]

EXPOSE 3000

#Start application
CMD ["gulp"]
