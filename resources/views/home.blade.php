<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="{{ asset('images/favicon.png') }}" type="image/png">
    @viteReactRefresh
    @vite('resources/js/index.js')
    <title>{{ config('app.name') }}</title>
</head>

<body>
    <div id="root"></div>
</body>

</html>
