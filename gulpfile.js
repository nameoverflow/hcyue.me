// var gulp = require('gulp');
// var babelify = require("babelify");
// var sass = require('gulp-sass');
// var browserify = require('gulp-browserify');
// //var sourcemaps = require('gulp-sourcemaps');
// var src_paths = {
//     main_js: ['./src/script/main.js'],
//     scripts: ['./src/script/**/*.js', './src/script/**/*.jsx', './src/script/**.js', './src/script/**.jsx'],
//     style: ['./src/**/*.sass', './src/**/*.scss']
// };
//
// var build_path = {
//     scripts: ['build']
// }
// var br_src = ['build/main/script/main.js', 'build/admin/script/main.js'];
//
//
//
// gulp.task('script', function () {
//     return gulp.src(src_paths.main_js)
//         // .pipe(sourcemaps.init())
//         .pipe(browserify({
//             transform: ['babelify'],
//             extensions: ['.js', '.jsx']
//         }))
//         .pipe(gulp.dest('./public/script'))
// })
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
    browserify({
        entries: './src/script/main.jsx',
        debug: true,
        extensions: ['.js', '.jsx']
    })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/script'));
});
