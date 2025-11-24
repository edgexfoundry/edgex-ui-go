FROM node:22-alpine3.22

# Install Chromium for automated testing.
RUN apk add --no-cache chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV NODE_OPTIONS=--openssl-legacy-provider

ENV PATH=/app/node_modules/.bin:$PATH

# Configure things to work with src mounted to "/app" directory.
ARG USER=1000
RUN deluser --remove-home node && \
    adduser -u $USER -D -s /bin/sh node
USER $USER:$USER
WORKDIR /app

