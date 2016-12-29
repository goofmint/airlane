import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import gls from 'gulp-live-server'

var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var Cache = require('gulp-file-cache');
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps');

var cache = new Cache();

var concat = require('gulp-concat');

gulp.task('watch', function() {
  gulp.watch(["./src/**/*.js"], ["compile"]);
  gulp.watch(["./public/**/*.*", "./views/**/*.*"], function(e) {
    livereload.changed(e);
  });
});

gulp.task('compile', function () {
  var stream = gulp.src('./src/**/*.js') // your ES2015 code
                   .pipe(cache.filter()) // remember files
                   .pipe(babel({})) // compile new ones
                   .pipe(cache.cache()) // cache them
                   .pipe(gulp.dest('./')) // write them
  return stream // important for gulp-nodemon to wait for completion
})

gulp.task("default", [
  'compile',
  'watch'
]);
