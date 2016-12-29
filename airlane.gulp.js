let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let livereload = require('gulp-livereload');
let fs = require('fs');
let watchify = require('gulp-watchify');
let rename = require("gulp-rename");  
let uglify = require("gulp-uglify");
let rework = require('gulp-rework');
let reworkNPM = require('rework-npm');
let babel = require('gulp-babel');

gulp.task('serve', () => {
  livereload.listen();
  nodemon({
    exec: 'node --inspect --debug',
    script: `${__dirname}/server.js`,
    ext: 'js, json, jade, css',
    ignore: ['bundle.js', 'bundle.css', 'public/*'],
    env: {
      'NODE_ENV': 'development'
    },
    verbose: true,
    stdout: true
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^application\ started/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
})

gulp.task('watchify', watchify( watchify => {
  gulp
    .src('**/public/app.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(watchify({
      watch: 'on',
      extensions: '.js'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./'))
}));

gulp.task('rework', watchify( watchify => {
  gulp
    .src('**/public/app.css')
    .pipe(rework(reworkNPM(), {sourcemap: true}))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./'))
}));

gulp.task('watch', ['watchify', 'rework'], () => {
  gulp.watch("**/public/app.css", ['rework']);  
});

gulp.start(['serve', 'watch']);
