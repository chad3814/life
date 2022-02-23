FROM node:16

COPY . /life

RUN yarn --cwd /life

ENTRYPOINT ["node", "/life"]
