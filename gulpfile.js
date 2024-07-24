'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten');

gulp.task('images', function () {
    return gulp.src(['src/app/components/**/images/*.png', 'src/app/components/**/images/*.gif']).pipe(flatten()).pipe(gulp.dest('dist/resources/images'));
});

gulp.task('themes', function () {
    return gulp.src(['src/assets/components/themes/**/*']).pipe(gulp.dest('dist/resources/themes'));
});

//Copy readme
gulp.task('readme', function () {
    return gulp.src(['README.md']).pipe(gulp.dest('dist'));
});

//Building project with run sequence
gulp.task('build-assets', gulp.series('copy-component-css', 'build-css-prod', 'images', 'themes', 'readme'));
