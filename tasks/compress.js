module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir,
                data = plugins.data(gulp, plugins, opts)();
        return gulp.src([compile_folder+'/*.html', compile_folder+'/images/**'], {base: compile_folder})
                .pipe(plugins.zip('build-'+Date.now()+'.zip'))
                .pipe(gulp.dest(compile_folder+'/builds'))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};