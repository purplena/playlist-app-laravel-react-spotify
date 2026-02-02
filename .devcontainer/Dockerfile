FROM mcr.microsoft.com/devcontainers/php:8.2-bullseye

# Install GD extension using the helper script
RUN install-php-extensions gd

# Verify GD installation
RUN php -m | grep gd
