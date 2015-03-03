var gulp = require('gulp');

var DIR_DEST = './build';

gulp.task('clean', function (callback) {
  var del = require('del');
  del([DIR_DEST], callback);
});

gulp.task('jshint', function () {
  var jshint = require('gulp-jshint');
  return gulp.src('src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jshint'], function () {
  var babel = require('gulp-babel');
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest(DIR_DEST));
});

gulp.task('default', ['clean', 'jshint'], function () {
  gulp.start('scripts');
});
