// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// tasks
var concat = require('gulp-concat');

gulp.task('concat-js', function() {
  return gulp.src('./app/js/dev/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./app/js/'));
});
gulp.task('concat-css', function() {
  return gulp.src('./app/css/dev/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./app/css/'));
});
gulp.task('lint', function() {
  gulp.src(['./app/js/*.js', '!./bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/js/*.js', '!./bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./bower_components/**')
    .pipe(gulp.dest('dist/libs'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8000
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

gulp.task('watch', function(){
  gulp.watch('./app/*/dev/*.*',['concat-js','concat-css','lint']);
});

// default task
gulp.task('default',
  ['concat-js','concat-css','lint','watch']
);
gulp.task('run',
  ['default','connect']
);

gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['concat-js','lint', 'concat-css','minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
  );
});