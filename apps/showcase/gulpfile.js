'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten');
//Copy readme
gulp.task('readme', function () {
    return gulp.src(['README.md']).pipe(gulp.dest('dist'));
});

//Building project with run sequence
gulp.task('build-assets', gulp.series('readme'));
