(function (require) {
    'use strict';
    //TODO add a warning file to puslished assets
    var gulp = require("gulp"),
    options = require('./gulpconfig.json'),
    task = function(task) {
        return require(options.tasksDir+'/' + task)(gulp, plugins, options);
    },
    plugins = require('gulp-load-plugins')({
        pattern: ['**'],
        replaceString: /^gulp(-|\.)/,
        camelize: true,
        lazy: true,
        rename: {}
    });
    plugins.fs = require('fs');
    options.compileDir = require(options.tasksDir+'/compileDir.js')(gulp, plugins, options)();
    console.log('Compile folder: '+options.compileDir);
    plugins.data = require(options.tasksDir+'/data.js');
    plugins.partials = require(options.tasksDir+'/partials.js');

    gulp.task('serve', task('serve'));
    gulp.task('clean', task('clean'));
    gulp.task('images', task('images'));
    gulp.task('sass', task('sass'));
    gulp.task('html', task('html'));
    gulp.task('inliner', task('inliner'));
    gulp.task('assets', gulp.parallel('images', 'sass'));
    gulp.task('build', gulp.series('html', 'assets', 'inliner'));

    gulp.task('default', gulp.series('build'));

    gulp.task('sync', function () {
        gulp.watch('./src/images/**', gulp.parallel('images'));
        gulp.watch('./src/scss/**', gulp.parallel('sass'));
    });
    gulp.task('watch', gulp.parallel('serve', 'sync'));
}(require));