const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('assets/js/app.js', 'public/js')
    .sass('assets/sass/app.scss', 'public/css');


mix.copyDirectory('assets/fonts', 'public/fonts')
    .copyDirectory('assets/icons', 'public/icons')
    .copyDirectory('assets/img', 'public/img')
    .copyDirectory('assets/svg', 'public/svg');
