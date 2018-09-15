FROM node

WORKDIR /usr/src/app
COPY . .

ENV PORT=80
EXPOSE 80

CMD [ "npm", "run", "prod" ]