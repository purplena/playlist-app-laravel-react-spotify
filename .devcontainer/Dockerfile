# Use the official PHP image as a base
FROM mcr.microsoft.com/devcontainers/php:8.2

# Install the GD extension and its dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd