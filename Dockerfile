FROM node:19-alpine3.16
WORKDIR /opt/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:docker"]