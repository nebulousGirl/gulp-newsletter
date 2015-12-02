module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv;
        return gulp.src(opts.compileDir+'/*.html')
                .pipe(plugins.inlineCss({
                    applyStyleTags: true,
                    applyLinkTags: true,
                    removeStyleTags: false,
                    removeLinkTags: true
                }))
                .pipe(gulp.dest(opts.compileDir));
    };
};