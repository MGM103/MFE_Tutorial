# Build Environment
# Get node dependency from docker hub
FROM node:16-alpine AS build

#Working directory
#This is analagous to mkdir for docker
WORKDIR /app

#Copies the node package files to the working directory
# Copies the package.json and lock files also which contain all the dependencies
COPY package.* .

#Installing all app dependencies
RUN npm install

#Copy all the code into app dir
COPY . .

# RUN Production build
# Run npm run builddocker
CMD ["npm", "run", "start"]