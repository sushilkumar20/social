FROM node

WORKDIR /nodejs/my-server/

ENV NODE_ENV=production

COPY . .

ENV PORT=3000

EXPOSE 3000

RUN npm ci

#run sequelize command
RUN cd src && npx sequelize db:create
RUN cd src && npx sequelize db:migrate
CMD ["npm",  "start"]