'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  prefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat');

gulp.task('default', ['scripts', 'sass', 'watch']);
// 'src/js/**/*.js'
gulp.task('scripts', function() {
  gulp.src(['src/js/three.min.js', 'src/js/renderers/*.js', 'src/js/main.js'])
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer('last 2 versions'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
})
