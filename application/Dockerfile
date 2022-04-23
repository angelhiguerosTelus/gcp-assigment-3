FROM node:alpine
WORKDIR /app
COPY ./package.json ./
COPY package-lock.json ./
RUN npm install
ARG REACT_APP_VM
COPY . ./
RUN npm run build
CMD ["npm", "start"]
