var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

function compile(src, out) {
    return browserify({
        entries: './src/script/' + src,
        debug: true,
        extensions: ['.js', '.jsx']
    })
    .transform(babelify)
    .bundle()
    .on('error', swallowError)
    .pipe(source(out))
}

gulp.task('c', function() {
    compile('main.jsx', 'main.js')./*pipe(streamify(uglify())).*/pipe(gulp.dest('./public/script'));
    compile('admin.js', 'admin.js').pipe(streamify(uglify())).pipe(gulp.dest('./public/script'));
});
gulp.task('b', function() {
    gulp.src('src/style/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style/'));
});

gulp.task('w', function () {
    gulp.watch(['src/script/**.js', 'src/script/**.jsx', 'src/script/**/*.js', 'src/script/**/*.jsx'], ['c']);
    gulp.watch(['src/style/**.sass', 'src/style/**.scss', 'src/style/**.css', 'src/style/**/*.sass', 'src/style/**/*.scss', 'src/style/**/*.css'], ['b']);
    // gulp.watch('img/**/*.{jpg,jpeg,png,gif}', ['copy:images']);
    // gulp.watch('less/*.less', ['styles']);
    // gulp.watch('templates/**/*.{swig,json}', ['html']);
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}
