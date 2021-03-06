'use strict';

const gulp        = require('gulp');
const csslint     = require('gulp-csslint');
const htmlhint    = require("gulp-htmlhint");
const eslint      = require('gulp-eslint');
const babel       = require('gulp-babel');
const connect     = require('gulp-connect');
const jsdoc       = require('gulp-jsdoc3');
const gulpIf      = require('gulp-if');
const argv        = require('yargs').argv;
const fileinclude = require('gulp-file-include');

const paths = {
  src:    './src',
  dst:    './',
  css:    ['./demo/**/*.css', './test/**/*.css', './src/**/*.css'],
  html:   ['./demo/**/*.html', './test/**/*.html'],
  js:     ['./demo/**/*.js', './test/**/*.js', './src/**/*.js'],
  csssrc: ['./src/**/*.css'],
  jssrc:  ['./src/**/*.js'],
  test:   {
    src: {
      layouts: 'test/_layouts/**/*.js',
      includes: 'test/_includes/**/*.js'
    }
  }
};

const fileincludeOpts = {
  prefix: '//@@',
  indent: true
}

const port = (argv.port === undefined) ? 8080 : argv.port;

// function isFixed(file) {
//   // Has ESLint fixed the file contents?
//   return file.eslint != null && file.eslint.fixed;
// }

gulp.task('reload', function () {
  return gulp.src(paths.js, { read: false })
    .pipe(connect.reload());
});

gulp.task('doc', () => {
  var config = require('./.jsdoc.json');
  return gulp.src(['./README.md'].concat(paths.jssrc))
    .pipe(fileinclude(fileincludeOpts))
    .pipe(jsdoc(config));
});

gulp.task('css-lint', () => {
  return gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('html-hint', () => {
  return gulp.src(paths.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('js-lint', () => {
  return gulp.src(paths.jssrc, { base: './' })
    .pipe(fileinclude(fileincludeOpts))
    .pipe(eslint())
    .pipe(eslint.format());
    // .pipe(gulpIf(isFixed, gulp.dest('./')));
});

gulp.task('js-copy', () => {
  return gulp.src(paths.jssrc)
    .pipe(fileinclude(fileincludeOpts))
    .pipe(babel())
    .pipe(gulp.dest(paths.dst));
});

gulp.task('css-copy', () => {
  return gulp.src(paths.csssrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('build-tests', () => {
  return gulp.src(paths.test.src.layouts)
    .pipe(fileinclude(fileincludeOpts))
    .pipe(gulp.dest('test'));
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['reload']);
  gulp.watch(paths.html, ['html-hint', 'doc', 'reload']);
  gulp.watch(paths.jssrc.concat(['includes/**/*.js']), ['js-lint', 'js-copy', 'doc', 'reload']);
  gulp.watch(paths.csssrc, ['css-lint', 'css-copy', 'reload']);
  gulp.watch([paths.test.src.layouts, paths.test.src.includes], ['build-tests', 'reload']);
});

gulp.task('connect', () => {
  connect.server({
    root: paths.dst,
    livereload: true,
    port: port
  });
});

gulp.task('default', [
  'css-lint',
  'html-hint',
  'css-copy',
  'js-lint',
  'js-copy',
  'build-tests',
  'doc',
  'watch',
  'connect'
]);
