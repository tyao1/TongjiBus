var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');

gulp.task('minify-css', function() {
  return gulp.src('./dist/styles/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dist/styles'))
});
