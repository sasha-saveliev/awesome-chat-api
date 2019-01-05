FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Cache modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]

RUN rm -rf /src
