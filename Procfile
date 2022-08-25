web: vendor/bin/heroku-php-nginx -C nginx.conf -F fpm_custom.conf public/
release: php artisan migrate --force && php artisan optimize && php artisan event:clear && php artisan event:cache
workers: php artisan queue:work --queue=high,low
