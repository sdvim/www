//TODO: set up self-hosted ngrok
// https://gist.github.com/lyoshenka/002b7fbd801d0fd21f2f

'use strict';

var browserify  = require('browserify');
var browserSync = require('browser-sync');
var buffer      = require('vinyl-buffer');
var cp          = require('child_process');
var cssbeautify = require('gulp-cssbeautify');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var plumber     = require('gulp-plumber');
var prefix      = require('gulp-autoprefixer');
var sass        = require('gulp-sass');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var svgSprite   = require('gulp-svg-sprite');

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
  // browserSync.notify(messages.jekyllBuild);
  // , '--incremental'
  return cp.spawn( 'jekyll' , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('javascript', function() {
  return browserify({ entries: ['_js/main.js'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('_site/assets'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets'));
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    ui: false,
    notify: false,
    open: false,
    // https: true,
    port: 8080,
    // proxy: 'https://sdv.im.dev:8890'
    // proxy: 'http://sdv.im.dev'
    server: './_site'
  });
});

// Compile Sass
gulp.task('sass', function () {
  return gulp.src('_scss/*.scss')
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['scss'] }))
    .pipe(prefix({
      // browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 7'],
      browsers: ['last 1 version'],
      cascade: false
    }))
    // .pipe(cssbeautify({ indent: '  ' }))
    .pipe(plumber.stop())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('_site/assets'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets'));
});

gulp.task('svg-sprite', function() {
  return gulp.src('_svg/icons/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: 'assets',
          sprite: 'icons.svg',
          prefix: '.svg-%s',
          example: true
        }
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
      }
    }))
    .pipe(gulp.dest('_site/assets'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets'));
});

// gulp.task('sprite-shortcut', function() {
  // return gulp.src('assets/icons.svg')
    // .pipe(gulp.dest('.'));
// });

// Watch Sass, HTML, Markdown, and SVG files
gulp.task('watch', function () {
  gulp.watch('_svg/icons/**/*.svg', ['svg-sprite'/*, 'sprite-shortcut'*/]);
  gulp.watch('_scss/**/*.scss', ['sass']);
  gulp.watch('_js/**/*.js', ['javascript']);
  gulp.watch([
    '_config.yml',
    '_data/*.yml',
    '_includes/*',
    '_layouts/*.html',
    '_pages/*',
    '_posts/**/*.md',
    '_works/**/*.html'
  ], ['jekyll-rebuild']);
});

// $ gulp
gulp.task('default', ['browser-sync', 'watch']);
