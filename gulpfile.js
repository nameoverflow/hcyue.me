var gulp = require('gulp');
var babelify = require("babelify");
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
//var sourcemaps = require('gulp-sourcemaps');
var src_paths = {
    scripts: ['src/**/**/*.js', 'src/**/**/*.jsx'],
    style: ['src/**/*.sass', 'src/**/*.scss']
};

var build_path = {
    scripts: ['build']
}
var br_src = ['build/main/script/main.js', 'build/admin/script/main.js'];



gulp.task('script', function () {
    return gulp.src(src_paths.scripts)
        // .pipe(sourcemaps.init())
        .pipe(browserify({
            transform: ['babelify'],
            extensions: ['.js', '.jsx']
        }))
        .pipe(gulp.dest('public'))
})
