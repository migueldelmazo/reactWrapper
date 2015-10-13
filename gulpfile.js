'use strict';

//requirements

var gulp        = require('gulp'),
    debug       = require('gulp-debug'),
    eslint      = require('gulp-eslint'),
    browserSync = require('browser-sync'),
    browserify  = require('browserify'),
    babelify    = require("babelify"),
    source      = require('vinyl-source-stream'),
    reload      = browserSync.reload,
    del         = require('del'),
    runSequence = require('run-sequence'),
    express     = require('gulp-express');

//settings

var DEV = './_dev',
  TMP = './_tmp';

gulp.task('clean', del.bind(null, [DEV]));
gulp.task('tmp:clean', del.bind(null, [TMP]));

gulp.task('deps', function() {
  return browserify({ debug: true })
    .require('react')
    .bundle()
    .pipe(source('deps.js'))
    .pipe(gulp.dest(DEV + '/app/'))
    .pipe(reload({ stream: true }));
});

gulp.task('browserify', function() {
  var b = browserify({ debug: true });

  b.external('react')
    .transform(babelify)
    .add('./app/index.jsx');

  return b.bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest(DEV + '/app/'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.jsx', ['lint', 'browserify']);
  gulp.watch('app/**/*.js', ['lint', 'browserify']);
  gulp.watch('html/**/*', ['copy-html']);
  gulp.watch('css/**/*', ['copy-css']);
  gulp.watch('json/**/*', ['copy-json']);
  gulp.watch(['api/*', 'api/**/*.js'], ['express']);
});

gulp.task('copy-html', function() {
  return gulp.src('./html/**/*.html')
    .pipe(gulp.dest(DEV))
    .pipe(reload({stream: true}));
});

gulp.task('copy-css', function() {
  return gulp.src('./css/**/*.css')
    .pipe(gulp.dest(DEV + '/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('copy-json', function() {
  return gulp.src('./json/**/*.json')
    .pipe(gulp.dest(DEV + '/json/'));
});

gulp.task('express', function () {
    express.run(['api/server.js']);
});

gulp.task('lint', function () {
    return gulp.src(['app/**/*'])
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    logPrefix: 'server',
    server: {
      baseDir: DEV
    }
  });
});

gulp.task('default', ['clean'], function() {
  runSequence(['lint', 'deps', 'browserify', 'copy-html', 'copy-css', 'copy-json'], 'browser-sync', 'express', 'watch');
});
