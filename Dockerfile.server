FROM node:18-alpine

WORKDIR /app

COPY db.json /app/

ENTRYPOINT [ "npx", "json-server", "db.json", "--port", "3000" ]