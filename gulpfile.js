var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');


gulp.task('compile', function() {
    browserify({
        entries: './src/script/main.jsx',
        debug: true,
        extensions: ['.js', '.jsx']
    })
    .transform(babelify)
    .bundle()
    .on('error', swallowError)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/script'));
    console.log("main.js Completed");
    browserify({
        entries: './src/script/admin.js',
        debug: true,
        extensions: ['.js', '.jsx']
    })
    .transform(babelify)
    .bundle()
    .on('error', swallowError)
    .pipe(source('admin.js'))
    .pipe(gulp.dest('./public/script'));
    console.log("admin.js Completed");
});
gulp.task('build', function() {
    gulp.src('src/style/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/style/'));
});

gulp.task('watch', function () {
    gulp.watch(['src/script/**.js', 'src/script/**.jsx', 'src/script/**/*.js', 'src/script/**/*.jsx'], ['compile']);
    gulp.watch(['src/style/**.sass', 'src/style/**.scss', 'src/style/**.css', 'src/style/**/*.sass', 'src/style/**/*.scss', 'src/style/**/*.css'], ['build']);
    // gulp.watch('img/**/*.{jpg,jpeg,png,gif}', ['copy:images']);
    // gulp.watch('less/*.less', ['styles']);
    // gulp.watch('templates/**/*.{swig,json}', ['html']);
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}
