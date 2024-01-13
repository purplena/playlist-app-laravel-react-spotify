#!/bin/bash

# Pull latest changes from the git repository
cd /home/lamp/www/playlist && git fetch && git pull

# Run composer install in the webserver container of the docker-compose file
docker-compose -f /home/lamp/docker-compose.yml run --rm -w /var/www/html/playlist webserver composer install

# Run migrations in the webserver container of the docker-compose file
docker-compose -f /home/lamp/docker-compose.yml run --rm -w /var/www/html/playlist webserver php artisan migrate --force
