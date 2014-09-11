var browserify = require('gulp-browserify')
  , gulp       = require('gulp')
  , sass       = require('gulp-sass')
  , uglify     = require('gulp-uglify')
  , watch      = require('gulp-watch');

gulp.task('sass', function() {
  return gulp.src('client/scss/style.scss')
             .pipe(sass({outputStyle: 'compressed'}))
             .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', function () {
  return gulp.src('client/js/app.js')
             .pipe(browserify({
                transform: ['jadeify'],
                insertGlobals : true
             }))
             .on('prebundle', function(bundle) {
                bundle.require('lodash', {expose : 'underscore'});
             })
             .pipe(gulp.dest('./public/js'));
});

gulp.task('uglify', function() {
  return gulp.src('client/js/app.js')
             .pipe(uglify())
             .pipe(gulp.dest('./public/js'));
})

gulp.task('watch', function() {
  gulp.watch(['client/js/*', 'client/js/**/*'], ['browserify']);
  gulp.watch('client/scss/style.scss', ['sass']);
});

gulp.task('default', ['sass', 'browserify', 'uglify']);
