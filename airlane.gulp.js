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
const mocha = require('gulp-mocha');
const path  = require('path');

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
  }).on('start', function() {
    setTimeout(function () {
      livereload.reload();
    }, 1000);
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
  livereload.reload();
}));

gulp.task('rework', watchify( watchify => {
  gulp
    .src('**/public/app.css')
    .pipe(rework(reworkNPM(), {sourcemap: true}))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./'))
  livereload.reload();
}));

var getMigration = () => {
  return new Promise((res, rej) => {
    let target_dir        = fs.realpathSync('./');
    var MigrateTask = require('migrate-orm2');
    var Module = new require('./modules')(target_dir);
    Module.getModules().then( m => {
      var task = new MigrateTask(Module.libraries.database.driver);
      res(task);
    }, (err) => {
      console.log(`LoadModule Error. ${err}`)
      rej(err);
    });
  })
}
gulp.task('migration-generate', () => {
  let generation_name = process.argv[2];
  getMigration()
    .then(task => {
      task.generate(generation_name, (err, result) => {});
    });
});

gulp.task('migration-up', () => {
  getMigration()
    .then(task => {
      task.up((err, result) => {
        if (err) throw err;
      });
    });
});

gulp.task('migration-down', () => {
  getMigration()
    .then(task => {
      task.down((err, result) => {
        if (err) throw err;
      });
    });
});

gulp.task('migration-redo', () => {
  getMigration()
    .then(task => {
      task.down((err, result) => {
        if (err) throw err;
        task.up((err, result) => {
          if (err) throw err;
        });
      });
    });
});

gulp.task('test', () => {
  let target_dir        = fs.realpathSync('./');
  var Module = require('./modules')(target_dir);
  Module.getModules().then((m) => {
    global.m = m;
    global.airlane_path = __dirname;
    gulp
      .src(['!**/node_modules/**/*.js', '**/test/*.js'], {read: false})
      .pipe(mocha({reporter: 'nyan'}));
  });
});

gulp.task('watch', ['watchify', 'rework'], () => {
  gulp.watch("**/public/app.css", ['rework']);  
});

module.exports = gulp;
