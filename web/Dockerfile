FROM node:16.17-alpine3.15

# Install Chromium for automated testing.
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

ENV PATH /app/node_modules/.bin:$PATH

# Update npm.
RUN npm install -g npm

# Configure things to work with src mounted to "/app" directory.
ARG USER=1000
RUN deluser --remove-home node && \ 
    adduser -u $USER -D -s /bin/sh node
USER $USER:$USER
WORKDIR /app

