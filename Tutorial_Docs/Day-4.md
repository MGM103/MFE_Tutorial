# Deployment via Docker

## Docker Overview

[Docker](https://www.docker.com/) is an open source platform that enables developers to build, deploy, run, update and manage containers—standardized, executable components that combine application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.<sup>[1]</sup>

To learn more about the underlying tech and the containerization process click [here](https://www.ibm.com/cloud/learn/docker).

## Docker installation

If you have not already installled Docker please click [here]() to be redirected to the Docker installation page.

## Creating a Dockerfile

A Dockerfile is a set of build instructions specifiying how Docker should build your image. An image is a template to build a container of your project. We will create a Dockerfile to deploy the container which is our user facing application.  

In the `container` directory create a file called `Dockerfile`. In the file add the following code:

```Dockerfile
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
```

Let's step through the Docker instructions one by one to properly understand what this file is doing.

```Dockerfile
FROM node:16-alpine AS build
```

The first instruction is simply to specify the node dependency to Docker. Please not that this line will change based on the version of Docker you are using. I am using v16 and there fore have specified node:16-alpine, if you are using a different version of node or would like to see the complete list of node options, please click [here](https://hub.docker.com/_/node).

```Dockerfile
WORKDIR /app
```

Next we specify the working directory in which Docker uses to create the image. WORKDIR can be thought of as an equivalent of MKDIR. This line creates the directory we will be using to build an image.

```Dockerfile
COPY package.* .
```
Next we copy the dependencies of the `container` react app into the Docker working directory

```Dockerfile
RUN npm install
```

These depenencies need to be installed, the above command creates the node modules in the working directory, thus installing the necessary dependencies.

```Dockerfile
COPY . .
```

The next step is to copy all of the `container` project code over to Docker

```Dockerfile
CMD ["npm", "run", "start"]
```

Lastly we run the build.

## Deployment

Now that we have created the Dockerfile it is time to deploy the `container`. Open the CLI navigate to the `container` directory and execute the following commands.

> Please ensure that the Docker application is running on your machine before executing the following commands.

```
docker build -t container .
```

This command builds the image, and the -t is for tagging, the image we are building is tagged as 'container' so that we can identify it.

```
docker run -d -p 8080:80 container
```

This command runs the image we have built i.e. creates a container of our `container` app.  The -p 8080:80 flag specifies that the container will be run on port 80 and exposed to the localhost on port 8080.<sup>[2]</sup> This means that the same url you have been using to view the container app will continue to work as Docker is allow access through this same port. Furthermore, the -d flag specifies that the container is to be run in detached mode. This means it is run in the background or in daemon mode.<sup>[2]</sup>

**Congratulations! You have now built and deployed a Micro Frontend!**

## Sources  

[1] https://www.ibm.com/cloud/learn/docker  
[2] https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/  
[3] https://buddy.works/tutorials/docker-commands-cheat-sheet

