<!DOCTYPE html>
<html>
<head>
    @yield('title')
    <meta name="csrf-token" content="{{csrf_token()}}"/>
    <meta name="app-id" content="{{ config('bigcommerce.app_id') }}"/>
    <meta name="helpscout-beacon-id" content="{{ config('services.helpscout.beacon_id') }}"/>
    <meta name="noticeable-token" content="{{ config('services.noticeable.token') }}"/>
    <meta name="noticeable-project-id" content="{{ config('services.noticeable.project_id') }}"/>
    <meta name="noticeable-label-id" content="{{ config('services.noticeable.label_id') }}"/>
    <meta name="support-docs-url" content="{{ config('app.support_docs_url') }}"/>
    <meta name="support-docs-faq-url" content="{{ config('app.support_docs_faq_url') }}"/>
    <meta name="support-email" content="{{ config('app.support_email') }}"/>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap"
          rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block" rel="stylesheet">
    @vite('resources/sass/app.scss')
</head>
<body>
<div id="root"></div>
@viteReactRefresh
@vite('resources/js/index.tsx')
</body>
</html>
