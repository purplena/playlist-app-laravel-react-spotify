FROM mcr.microsoft.com/devcontainers/php:8.2-bullseye

RUN apt-get update
RUN apt-get install -y libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN rm -rf /var/lib/apt/lists/*
