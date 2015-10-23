var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config').browserify;


gulp.task('compressjs', function() {
  return gulp.src('./dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
});
