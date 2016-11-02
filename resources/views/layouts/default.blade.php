<html>
  <head>
    <title>@yield('title') - APL Learning</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('/').('public/css/bootstrap.min.css') }}">
    <!-- 1. Load libraries -->
     <!-- Polyfill(s) for older browsers -->
    <script src="{{ asset('/').('node_modules/core-js/client/shim.min.js') }}"></script>
    <script src="{{ asset('/').('node_modules/zone.js/dist/zone.js') }}"></script>
    <script src="{{ asset('/').('node_modules/reflect-metadata/Reflect.js') }}"></script>
    <script src="{{ asset('/').('node_modules/systemjs/dist/system.src.js') }}"></script>
    <!-- 2. Configure SystemJS -->
    <script src="{{ asset('/').('public/systemjs.config.js') }}"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
    <base href="/">
  </head>
  <!-- 3. Display the application -->
  <body>
    @yield('top')
    <div class="container">
        @yield('content')
    </div>
    <script src="{{ asset('/').('public/js/jquery-3.1.1.min.js') }}"></script>
    <script src="{{ asset('/').('public/js/bootstrap.min.js') }}"></script>
    @yield('foot')
  </body>
</html>
