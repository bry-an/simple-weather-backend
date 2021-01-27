FROM node:14.15-slim

# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i -g npm@latest

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY package.json package-lock.json* ./
RUN npm i --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /opt/node_app/app
COPY . .

CMD ["node", "./src/index.js"]