FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

# EXPOSE 8005

# CMD ["npm", "run", "dev"]