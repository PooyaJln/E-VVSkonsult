FROM node:18-alpine

RUN npm install --location=global npm@9.2.0
RUN npm install --location=global nodemon

# the working directory in the container
WORKDIR /projects/evvskonsult/frotend

# copy files from the root directory of the docker file to 
# destination folder with regards to the container's working directory
COPY package.json .


#command that is run when the image i being built
RUN npm install
COPY . .


EXPOSE 3000

#command that is run by the container
CMD [ "/usr/local/bin/npm", "start" ]