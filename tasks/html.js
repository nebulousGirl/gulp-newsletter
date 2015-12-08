module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir,
                data = plugins.data(gulp, plugins, opts)();
        return gulp.src('./src/views/*.mustache')
                .pipe(plugins.mustache(data, {extension: ".html"}, plugins.partials(gulp, plugins, opts)()))
                .pipe(gulp.dest(compile_folder))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};