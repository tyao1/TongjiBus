var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config').watch;

gulp.task('compress', ['compressjs','minify-css'], function() {
  gulp.src(config.src).pipe(connect.reload());
});
