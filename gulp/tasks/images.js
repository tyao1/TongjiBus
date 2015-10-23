var gulp = require('gulp');
var changed    = require('gulp-changed');
var connect = require('gulp-connect');
var imagemin   = require('gulp-imagemin');
var config = require('../config.js').images;

gulp.task('images', function() {
  gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});
