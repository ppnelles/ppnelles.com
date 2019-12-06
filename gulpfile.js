'use strict';

var	gulp = require('gulp'),
	sass = require('gulp-sass'),
	postcss = require("gulp-postcss"),
    concat = require("gulp-concat"),
	autoprefixer = require("autoprefixer"),
	cssnano = require("cssnano"),
	sourcemaps = require("gulp-sourcemaps"),
    realFavicon = require ('gulp-real-favicon'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    paths = {
        styles: {
            src: "sass/**/*.scss",
            dest: "dist/vcard"
        },
        scripts: {
            src: "js/*.js",
            dest: "dist/vcard"
        }
    };

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
    );
}

function scripts() {
    return (
        gulp
            .src(paths.scripts.src)
            .pipe(sourcemaps.init())
            .pipe(concat('scripts.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.scripts.dest))
    );
}

function watchSass() {
    gulp.watch(paths.styles.src, style)
}

function watchJs() {
    gulp.watch(paths.scripts.src, scripts)
}

exports.style = style;
exports.scripts = scripts;
exports.watch = gulp.parallel(watchSass, watchJs);