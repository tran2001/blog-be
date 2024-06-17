version: "2"
services:
  node:
    image: "node:820.12.0"
    user: "node"
    working_dir: /home/node/app
    environment:
      - NODE_ENV=production
    volumes:
      - ./:/home/node/app
    expose:
      - "8080"
    ports: # use if it is necessary to expose the container to the host machine
      - "8000:8000"
    command: "npm start"