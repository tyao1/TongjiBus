var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var config = require('../config.js').sass;
var gutil = require('gulp-util');

function handleErrors(args){
  console.log('SASS ERROR');
  console.log(args);
}

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .on('error', gutil.log.bind(gutil, 'SASS Error'))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});
