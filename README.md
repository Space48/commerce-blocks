# Your Products Anywhere - Space48

_Description goes here._

## Getting started

To get the app running locally, clone the repo and run:

`composer install`

`npm install`

Create a .env file by copying the env.example and amending for your local environment setup.

If using Laravel Sail then use `sail artisan` instead of `php artisan` going forward, and run:

`./vendor/bin/sail up`

Then:

`php artisan migrate`

`npm run dev`

Next, if you haven’t already, create an app on your Bigcommerce developer account. You’ll need to populate the following fields under the technical tab, to match your local development domain.

- Remove User Callback URL: **https://your-local-domain.com/api/bc/remove-user**
- Auth Callback URL: **https://your-local-domain.com/api/bc/install**
- Load Callback URL: **https://your-local-domain.com/api/bc/load**
- Uninstall Callback URL: **https://your-local-domain.com/api/bc/uninstall**

You’ll also need to set the following OAuth scopes:

- Information & Settings: **READ-ONLY**
- Products: **READ-ONLY** _(this can be removed later, if it’s not required)_


Once the app has been saved, copy the following details into the .env file:

```
BIGCOMMERCE_APP_ID=<shown in the URL when editing your app>
BIGCOMMERCE_CLIENT_ID=<shown via View Client ID>
BIGCOMMERCE_CLIENT_SECRET=<shown via View Client ID>
BIGCOMMERCE_WEBHOOK_SECRET=<Generate a unique code for this>
```

You’re now ready to install the app on your store.

## Testing

Tests can be ran via:

`php artisan test`


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT