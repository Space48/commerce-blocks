# Replaces https://github.com/heroku/heroku-buildpack-php/blob/2acb8a055fa96289645d4b77a68a6cd41d67767c/conf/nginx/default_include.conf.php

if ($http_x_forwarded_proto != 'https') {
    rewrite ^ https://$host$request_uri? permanent;
}

location ~* \.(eot|ttf|woff|woff2|css|js)$ {
    add_header Access-Control-Allow-Origin *;
}

location / {
    try_files $uri @rewriteapp;
}

location @rewriteapp {
    rewrite ^(.*)$ /index.php$1 last;
}
