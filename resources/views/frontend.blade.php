<!DOCTYPE html>
<html>
<head>
    @yield('title')
    <meta name="csrf-token" content="{{csrf_token()}}"/>
    <meta name="app-id" content="{{ config('bigcommerce.app_id') }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
    @vite('frontend/resources/sass/app.scss', 'frontend/build')
</head>
<body>
<div id="root"></div>
@vite('frontend/resources/js/index.tsx', 'frontend/build')
</body>
</html>
