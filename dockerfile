FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# EXPOSE 8005

# CMD ["npm", "run", "dev"]