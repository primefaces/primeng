'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten');

gulp.task('build-css', function() {
	gulp.src([
        'src/app/components/common/common.css',
		    'src/app/components/**/*.css'
    ])
        .pipe(concat('primeng.css'))
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'src/app/components/common/common.css',
        'src/app/components/badge/badge.css',
        'src/app/components/button/button.css',
        'src/app/components/checkbox/checkbox.css',
        'src/app/components/colorpicker/colorpicker-images.css',
        'src/app/components/inputtext/inputtext.css',
        'src/app/components/inputtextarea/inputtextarea.css',
        'src/app/components/password/password.css',
        'src/app/components/radiobutton/radiobutton.css',
        'src/app/components/ripple/ripple.css',
        'src/app/components/tooltip/tooltip.css'
    ])
    .pipe(concat('primeng.css'))
    .pipe(gulp.dest('dist/resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primeng.min.css'))
    .pipe(gulp.dest('dist/resources'));
});

gulp.task('copy-component-css', function () {
    gulp.src([
        'src/app/components/**/*.css',
        'src/app/components/**/images/*.png',
        'src/app/components/**/images/*.gif'
    ])
    .pipe(gulp.dest('dist/resources/components'));
});

gulp.task('images', function() {
    return gulp.src(['src/app/components/**/images/*.png', 'src/app/components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/resources/images'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/components/themes/**/*','!src/assets/components/themes/soho-*/**/*','!src/assets/components/themes/mira/**/*'])
        .pipe(gulp.dest('dist/resources/themes'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['dist/resources']);
});

//Copy readme
gulp.task('readme', function() {
    gulp.src(['README.md'])
    .pipe(gulp.dest('dist'));
});

//Building project with run sequence
gulp.task('build-assets', ['clean','copy-component-css', 'build-css-prod', 'images', 'themes', 'readme']);

