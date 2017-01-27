module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv,
            assets_folder = opts.compileDir+opts.assetsDir;
        return gulp.src(opts.sass.glob).pipe(plugins.sass())
                .pipe(plugins.autoprefixer({browsers: opts.sass.browsers}))
                .on('error', plugins.sass.logError)
                .pipe(gulp.dest(assets_folder + opts.sass.outputDir))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};