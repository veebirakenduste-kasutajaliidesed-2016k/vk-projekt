'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  prefixer = require('gulp-autoprefixer'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

gulp.task('default', ['scripts','browserify', 'sass', 'watch']);

gulp.task('scripts', function() {
  gulp.src('src/js/**/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});

gulp.task('browserify', function() {
    return browserify('./src/js/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer('last 2 versions'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts','browserify']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
})
