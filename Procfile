web: vendor/bin/heroku-php-nginx -c nginx/base.conf.php -C nginx/app.conf.php -F fpm_custom.conf public/
release: php artisan migrate --force && php artisan optimize && php artisan event:clear && php artisan event:cache
workers: php artisan queue:work --queue=high,low
