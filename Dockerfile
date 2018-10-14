FROM node:9.3

ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}

COPY ./ /opt/htdoc/blog
WORKDIR /opt/htdoc/blog

EXPOSE 8080

CMD node ./bin/www