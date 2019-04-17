/** ===========================================================================
 * File: /gulpfile.js
 * Project: Maat Legal Theme
 * -----
 * Author: Sam Rankin (sam@maatlegal.com>)
 * Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  1-16-19
 * Last Modified: 4-16-19 at 5:12 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 ** Implements:
 *   1. Live reloads browser with BrowserSync.
 *   2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *      CSS minification, and Merge Media Queries.
 *   3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *   4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *   5. Watches files for changes in CSS or JS.
 *   6. Watches files for changes in PHP.
 *   7. Corrects the line endings.
 *   8. InjectCSS instead of browser page reload.
============================================================================ */

/** ===========================================================================
Global
============================================================================ */

    // Variables ==============================================================
    const config    = require('./config/gulp-config.json'),
        pkg       = require('./package.json'),
        gulpEnv   = config.project.env,
        gulpSlug  = config.project.slug + '-';

    var   gulpUrl;

    const devUrl    = config.urls.dev,
        stageUrl  = config.urls.stage,
        prodUrl   = config.urls.prod,
        isProd    = false;

    if (gulpEnv === 'prod') {
        gulpUrl = prodUrl;
        isProd  = true;
    } else if (gulpEnv === 'stage') {
        gulpUrl = stageUrl;
    } else {
        gulpUrl = devUrl;
    }

    // Paths ==============================================================
    const fontsPath         = config.paths.abs.fonts,
          pagesPath         = config.paths.abs.pages,
          stylesBuildPath   = config.paths.abs.build.styles,
          scriptsBuildPath  = config.paths.abs.build.scripts,
          imagesBuildPath   = config.paths.abs.build.images,
          stylesDistPath    = config.paths.abs.dist.styles,
          scriptsDistPath   = config.paths.abs.dist.scripts,
          imagesDistPath    = config.paths.abs.dist.images,
          cssBuildPath      = config.paths.rel.build.styles,
          jsBuildPath       = config.paths.rel.build.scripts,
          imgBuildPath      = config.paths.rel.build.images,
          cssDistPath       = config.paths.rel.dist.styles,
          jsDistPath        = config.paths.rel.dist.scripts,
          imgDistPath       = config.paths.rel.dist.images;

    // Files ==============================================================
    const mainSass = config.sass.main,
        adminSass = config.sass.admin,
        pageSass = config.sass.pages,
        mainJS = config.js.main,
        adminJS = config.js.admin,
        vendorJS = config.js.vendor,
        pageJS = config.js.pages,
        imageFiles = config.images;

    // Plugins ================================================================
    const {
        gulp,
        series,
        parallel,
        task,
        src,
        dest,
        watch
    } = require('gulp');

    const debug         = require('gulp-debug'),

        filter        = require('gulp-filter'),
        lineec        = require('gulp-line-ending-corrector'),
        log           = require('fancy-log'),
        newer         = require('gulp-newer'),
        notify        = require('gulp-notify'),

        plumber       = require('gulp-plumber'),

        rename        = require('gulp-rename'),

        stripComments = require('gulp-strip-comments'),

        gif           = require('gulp-if'),
        lazypipe      = require('lazypipe'),
        inject        = require('gulp-inject-string'),
        beautify      = require('gulp-beautify'),

        mapFilter     = ['!**/*.map'],
        onErrors = lazypipe().pipe(notify, {
            message: 'Error Generating file: <%= file.basename %>',
            logLevel: 1,
            emitError: true,
            onLast: true
        }),
        onSuccess = lazypipe().pipe(notify, {
            message: 'Successfully Generated file: <%= file.basename %>',
            logLevel: 1,
            emitError: true,
            onLast: true
        }),
        fileCount = function () {
            var count = 0;
            function countFiles(file) {
                count++;
            }
            return count;
        };

/** ===========================================================================
Browser Sync
============================================================================ */

    // Plugins ================================================================
    const browsersync = require('browser-sync').create();

    // Tasks ===================================================================
    // BrowserSync Init
    function browserSync() {
        browsersync.init({
            files: [{
                match: [
                    'assets/css/*.css',
                    'assets/js/*.js',
                    'assets/imgs/*',
                    '**/*.php'
                ]
            }],
            ignore: ['**/*.min.*', '**/*.map'],
            proxy: gulpUrl,
            open: true,
            injectChanges: true,
            logFileChanges: true
        });
    }

    function browserSyncStyleGuide() {
        browsersync.init({
            files: [{
                match: [
                    'assets/css/*.css',
                    'assets/js/*.js',
                    'assets/imgs/*',
                    './style-guide.html'
                ]
            }],
            server: {
                baseDir: './',
                index: 'style-guide.html'
            },
            ignore: ['**/*.min.*', '**/*.map'],
            open: true,
            injectChanges: true,
            logFileChanges: true
        });
    }

    function bsreload(done) {
        browsersync.reload();
        done();
    }

    exports.bs        = browserSync;
    exports.bsStyle   = browserSyncStyleGuide;
    exports.bsreload  = bsreload;

/** ===========================================================================
CSS
============================================================================ */

    // Plugins ================================================================
    const sass          = require('gulp-sass'),
        autoprefixer  = require('autoprefixer'),
        mmq           = require('css-mqpacker'),
        sortCSSmq     = require('sort-css-media-queries'),
        postcss       = require('gulp-postcss'),
        aspectRatio   = require('postcss-aspect-ratio'),
        assets        = require('postcss-assets'),
        easings       = require('postcss-easings'),
        inlineSVG     = require('postcss-inline-svg'),
        fixes         = require('postcss-fixes'),
        letterSpacing = require('postcss-letter-tracking'),
        momentum      = require('postcss-momentum-scrolling'),
        globImporter  = require('node-sass-glob-importer'),
        cleanCSS      = require('gulp-clean-css'),
        minifyCSS     = lazypipe().pipe(filter, mapFilter).pipe(rename, {suffix: '.min'})
            .pipe(cleanCSS, {
            compatibility: '*',
            level: 2,
            sourceMap: true,
            debug: true,
            specialComments: 'none',
        }),
        pageRenameCSS = lazypipe().pipe(rename, function (path) {
            var pathDir = path.basename + cssDistPath;
            path.dirname = pathDir;
        }).pipe(rename, {
            prefix: gulpSlug
        });


    // PostCSS Plugins
    const postCSSplugins = [
        inlineSVG({
            path: imagesDistPath
        }),
        assets({
            relative: stylesDistPath,
            loadPaths: [fontsPath, imagesDistPath]
        }),
        fixes(),
        letterSpacing(),
        aspectRatio(),
        easings(),
        momentum(),
        autoprefixer({
            browsers: config.browsers
        }),
        mmq({
            sort: sortCSSmq
        })
    ];

    // Tasks ==================================================================
    function compileCSS(files, fileDest) {
        var errorFree = true,
            hasErrors = false;
        return src(files, {
            allowEmpty: true,
            sourcemaps: true,
            base: './'
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(
            sass({
                errLogToConsole: true,
                precision: 10,
                sourceComments: true,
                sourceMapContents: true,
                sourceMap: true,
                indentWidth: 4,
                importer: globImporter(),
                includePaths: [
                    pkg.globalNode
                ]
            })
        )
        .pipe(postcss(postCSSplugins))
        .pipe(
            rename({
                dirname: '',
                prefix: gulpSlug,
            })
        )
        .pipe(lineec())
        .pipe(stripComments.text({
            ignore: /url\([\w\s:\/=\-\+;,]*\)/g
        }))
        .pipe(
            cleanCSS({
                format: 'beautify',
                compatibility: 'ie8',
                level: 1,
                sourceMap: true,
                debug: true,
                inline: ['all']
            })
        )

        .pipe(beautify.css({
            indent_size: 4
        }))
        .pipe(dest(fileDest, {
            sourcemaps: '.'
        }))
        .pipe(gif(isProd, minifyCSS()))
        .pipe(plumber.stop())
        .pipe(dest(fileDest))
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function compilePageCSS(files) {
        var errorFree = true,
            hasErrors = false;
        return src(files, {
            allowEmpty: true,
            sourcemaps: true,
            base: './'
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(
            sass({
                errLogToConsole: true,
                precision: 10,
                sourceComments: true,
                sourceMapContents: true,
                sourceMap: true,
                indentWidth: 4,
                importer: globImporter(),
                includePaths: [
                    pkg.globalNode,
                    stylesBuildPath
                ]
            })
        )
        .pipe(pageRenameCSS())
        .pipe(postcss(postCSSplugins))
        .pipe(lineec())
        .pipe(
            cleanCSS({
                format: 'beautify',
                compatibility: 'ie8',
                level: 1,
                sourceMap: true,
                debug: true,
                inline: ['all']
            })
        )
        .pipe(beautify.css({
            indent_size: 4
        }))
        .pipe(dest(pagesPath, {
            sourcemaps: '.'
        }))
        .pipe(gif(isProd, minifyCSS()))
        .pipe(plumber.stop())
        .pipe(dest(pagesPath, {
            sourcemaps: '.'
        }))
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function mainStyles(done) {
        compileCSS(mainSass, stylesDistPath);
        done();
    }

    function adminStyles(done) {
        compileCSS(adminSass, stylesDistPath);
        done();
    }

    function pageStyles(done) {
        compilePageCSS(pageSass);
        done();
    }

    exports.mainStyles  = mainStyles;
    exports.adminStyles = adminStyles;
    exports.pageStyles  = pageStyles;
    exports.styles      = parallel(mainStyles, adminStyles, pageStyles);

/** ===========================================================================
JS
============================================================================ */

    // Plugins ====================================================================
    const uglify  = require('gulp-uglify'),
        concat  = require('gulp-concat'),
        babel   = require('gulp-babel'),
        jshint  = require('gulp-jshint');

    // Variables ==============================================================
    const jsValidate        = lazypipe().pipe(jshint, pkg.jshintFile).pipe(jshint.reporter, 'jshint-stylish'),
        groupConcat       = lazypipe().pipe(inject.prepend, 'var exports = {};\n').pipe(concat, 'temp.js'),
        minifyJS = lazypipe().pipe(filter, mapFilter).pipe(rename, {
            suffix: '.min'
        }).pipe(stripComments, {
            safe: false,
            space: true
        }).pipe(uglify),
        pageRenameJS = lazypipe().pipe(rename, function (path) {
            var pathDir = path.basename + jsDistPath;
            path.dirname = pathDir;
        }).pipe(rename, {prefix: gulpSlug});

    // Tasks ==================================================================
    function compileJS(files, fileDest, fileBase = '') {
        var validate = true,
            errorFree = true,
            hasErrors = false,
            group = false;
        if (fileCount > 1) {
            group = true;
        }
        if (fileBase === 'vendor') {
            validate = false;
        }
        return src(files, {
            allowEmpty: true,
            sourcemaps: true,
            base: './',
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gif(group, groupConcat()))
        .pipe(gif(validate, jsValidate()))
        .pipe(
            rename({
                basename: fileBase,
                prefix: gulpSlug,
            })
        )
        .pipe(beautify.js({
            indent_size: 4
        }))
        .pipe(dest(fileDest, {
            sourcemaps: '.'
        }))
        .pipe(gif(isProd, minifyJS()))
        .pipe(plumber.stop())
        .pipe(dest(fileDest))
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function compilePageJS(files) {
        var validate = true,
            errorFree = true,
            hasErrors = false;
        return src(files, {
            allowEmpty: true,
            sourcemaps: true,
            base: './',
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(pageRenameJS())
        .pipe(dest(pagesPath))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gif(validate, jsValidate()))
        .pipe(beautify.js({
            indent_size: 4
        }))
        .pipe(gif(isProd, minifyJS()))
        .pipe(plumber.stop())
        .pipe(dest(pagesPath))
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function mainScripts(done) {
        compileJS(mainJS, scriptsDistPath, 'main');
        done();
    }

    function adminScripts(done) {
        compileJS(adminJS, scriptsDistPath, 'admin');
        done();
    }

    function vendorScripts(done) {
        compileJS(vendorJS, scriptsDistPath, 'vendor');
        done();
    }

    function pageScripts(done) {
        compilePageJS(pageJS);
        done();
    }

    exports.mainScripts   = mainScripts;
    exports.adminScripts  = adminScripts;
    exports.vendorScripts = vendorScripts;
    exports.pageScripts   = pageScripts;
    exports.scripts       = parallel(mainScripts, adminScripts, vendorScripts, pageScripts);

/** ===========================================================================
Images
============================================================================ */

    // Variables ==============================================================

    // Plugins ================================================================
    const imagemin   = require('gulp-imagemin');

    // Tasks ==================================================================
    function images() {
        var imageFilter = filter(['**/*.png', '**/*.gif', '**/*.jpg', '**/*.jpeg', '**/*.svg'], {
            restore: true
        });
        return src(imageFiles, {
            base: './'
        })
        .pipe(
            rename({
                dirname: ''
            })
        )
        .pipe(newer(imagesDistPath))
        .pipe(imageFilter)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    },
                    {
                        inlineStyles: true
                    }
                ]
            })
        ]))
        .pipe(imageFilter.restore)
        .pipe(dest(imagesDistPath));
    }

    exports.images = images;

/** ===========================================================================
Watch
============================================================================ */

// Variables ==============================================================
const watchSass = stylesBuildPath + '/**/*.scss';

// Tasks ==================================================================
function watchFiles() {
    watch(watchSass,  mainStyles);
    watch(adminSass, adminStyles);
    watch(pageSass, pageStyles);
    watch(mainJs, mainScripts);
    watch(adminJs, adminScripts);
    watch(imageFiles, images);
}
exports.watch = watchFiles;

/** ===========================================================================
Build
============================================================================ */

exports.adminBuild = parallel(adminStyles, adminScripts);
exports.mainBuild  = parallel(mainStyles, mainScripts, vendorScripts, images);
exports.pageBuild  = parallel(pageStyles, pageScripts);
exports.build = parallel(images, vendorScripts, adminStyles, adminScripts, mainStyles, mainScripts, pageStyles, pageScripts);