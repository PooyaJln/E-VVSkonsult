FROM node:lts-bookworm AS development

WORKDIR /heatLossApp/frontend
COPY package*.json .
RUN npm install
COPY . .

CMD [ "npm", "run", "start" ]