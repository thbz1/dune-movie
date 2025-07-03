const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')

function styles() {
    return gulp.src('src/styles/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css', { sourcemaps: '.' }))
}

function scripts() {
    return gulp.src('src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
}

function images() {
    return gulp.src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

function favicons() {
    return gulp.src('src/assets/favicons/*')
        .pipe(gulp.dest('dist/'));
}

function html() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
}

exports.default = gulp.parallel(styles, images, scripts, favicons, html);

exports.watch = function () {
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles))
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts))
    gulp.watch('./index.html', gulp.parallel(html))
}