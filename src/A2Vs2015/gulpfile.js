/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
const del = require('del');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('clean', function () {
    return del('wwwroot/**/*');
});

gulp.task('css', function () {
    return gulp.src('./css/app.scss')
    .pipe(sass({
        includePaths: ['node_modules/bootstrap-sass/assets/stylesheets'],
    }))
    .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('fonts', function () {
    gulp.src('node_modules/font-awesome/**/*')
    .pipe(gulp.dest('wwwroot/fonts'));

    gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest('wwwroot/fonts/bootstrap'));
});

gulp.task('copy:assets', function () {
    return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], { base: './' })
      .pipe(gulp.dest('wwwroot'))
});

gulp.task('copy:libs', function () {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js'
    ])
    .pipe(gulp.dest('wwwroot/libs'))
});

gulp.task('compile', function () {
    var tsProject = ts.createProject('./tsconfig.json');
    var tsResult = gulp.src('app/**/*.ts')
        .pipe(ts(tsProject))
    return tsResult.js
		.pipe(gulp.dest('wwwroot/app'))
});

gulp.task('serve', ['build'], function () {
    browserSync.init(
        {
            injectChanges: false, // workaround for Angular 2 styleUrls loading
            files: ['./**/*.{html,htm,css,js}'],
            watchOptions: {
                ignored: "node_modules"
            },
            server: {
                baseDir: './wwwroot',
                middleware: [
                  historyApiFallback({ "index": '/index.html' })
                ]
            }
        });

    gulp.watch(['app/**/*', 'css/**/*', 'index.html'], ['buildAndReload']);
});

gulp.task('build', ['clean'], function (cb) {
    runSequence(['compile', 'copy:libs', 'copy:assets', 'css', 'fonts'], cb);
});

gulp.task('buildAndReload', ['build'], function (cb) {
    gutil.log('reloading');
    browserSync.reload;
    gutil.log('reloaded');
});

gulp.task('default', ['build']);