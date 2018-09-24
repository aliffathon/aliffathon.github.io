'use strict';

// Documentasi
// https://css-tricks.com/gulp-for-beginners/
// https://www.npmjs.com/package/gulp-sass
// https://browsersync.io/docs

var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
  console.log('Hello Dunia');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '_site',
      routes: {
          "/bower_components": "bower_components"
      }
    },
  })
})

gulp.task('watch', ['browserSync'], function (){
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('_site/**/*.html', browserSync.reload);
  gulp.watch('_site/**/*.js', browserSync.reload);
  gulp.watch('_site/**/*.css', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  )
})
