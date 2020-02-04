/** ===========================================================================
 * File: /gulpfile.js
 * Project: Maat Legal Theme
 * -----
 * Author: Sam Rankin (sam@maatlegal.com>)
 * Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  1-16-19
 * Last Modified: 5-9-19 at 12:40 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
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
    const   pkg       = require('./package.json'),
            gulpEnv   = pkg.env,
            gulpSlug  = pkg.name + '-';

    var     gulpUrl;

    const   devUrl    = pkg.urls.dev,
            stageUrl  = pkg.urls.stage,
            prodUrl   = pkg.urls.prod,
            isProd    = false;

    if (gulpEnv === 'prod') {
        gulpUrl = prodUrl;
        isProd  = true;
    } else if (gulpEnv === 'stage') {
        gulpUrl = stageUrl;
    } else {
        gulpUrl = devUrl;
    }

    // Configs ================================================================

        const   globalNode    = pkg.globalNode,
                modernizrpkg  = pkg.modernizr,
                browserlist   = pkg.browserslist,
                babelConfig   = pkg.babel,
                jshintpkg     = pkg.jshintConfig;



    // Paths ==================================================================
    const   paths             = pkg.paths,
            fontsPath         = paths.fonts,
            pagesPath         = paths.pages,
            adminPath         = paths.admin,
            stylesBuildPath   = paths.build.styles,
            scriptsBuildPath  = paths.build.scripts,
            stylesDistPath    = paths.dist.styles,
            scriptsDistPath   = paths.dist.scripts,
            imagesDistPath    = paths.dist.images;

    // Files ==================================================================
    const   input           = pkg.inputFiles,
            mainSassFiles   = input.sass.main,
            adminSassFiles  = input.sass.admin,
            pageSassFiles   = input.sass.pages,
            mainJSFiles     = input.js.main,
            adminJSFiles    = input.js.admin,
            vendorJSFiles   = input.js.vendor,
            pageJSFiles     = input.js.pages,
            imageFiles      = input.images;

    // Plugins ================================================================
    const {
        gulp,
        series,
        parallel,
        task,
        src,
        dest,
        lastRun,
        watch
    } = require('gulp');

    const   debug         = require('gulp-debug'),
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
            inlineFonts   = require('gulp-inline-fonts'),
            inject        = require('gulp-inject-string'),
            beautify      = require('gulp-beautify'),
            groupConcat   = require('gulp-concat-multi'),
            sourcemaps    = require('gulp-sourcemaps'),
            changed       = require('gulp-changed'),
            merge         = require('merge-stream'),
            mapFilter     = ['!**/*.map'],
            onErrors      = lazypipe()
                                .pipe(notify, {
                                    message   : 'Error Generating file: <%= file.basename %>',
                                    logLevel  : 1,
                                    emitError : true,
                                }),
            onSuccess     = lazypipe()
                                .pipe(notify, {
                                    message   : 'Successfully Generated file: <%= file.basename %>'
                                });

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
                    '**/assets/css/*.css',
                    '**/assets/js/*.js',
                    '**/assets/imgs/*',
                    '**/*.php',
                ]
            }],
            ignore: [
                '**/*.min.*',
                '**/*.map',
                'node_modules/**',
                './inc/admin/**'
            ],
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
                    './assets/css/*.css',
                    './assets/js/*.js',
                    './assets/imgs/*',
                    './style-guide.html'
                ]
            }],
            server: {
                baseDir: './',
                index: 'style-guide.html'
            },
            ignore: [
                '**/*.min.*',
                '**/*.map',
                'node_modules/**',
                './inc/admin/**'
            ],
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
    const   sass            = require('gulp-sass'),
            autoprefixer    = require('autoprefixer'),
            mmq             = require('css-mqpacker'),
            sortCSSmq       = require('sort-css-media-queries'),
            postcss         = require('gulp-postcss'),
            aspectRatio     = require('postcss-aspect-ratio'),
            aspectRatioBG   = require('postcss-aspect-ratio-from-bg-image')
            assets          = require('postcss-assets'),
            easings         = require('postcss-easings'),
            inlineSVG       = require('postcss-inline-svg'),
            fixes           = require('postcss-fixes'),
            letterSpacing   = require('postcss-letter-tracking'),
            momentum        = require('postcss-momentum-scrolling'),
            globImporter    = require('node-sass-glob-importer'),
            cleanCSS        = require('gulp-clean-css'),
            fontMagician    = require('postcss-font-magician'),
            smoothGradients = require('postcss-easing-gradients'),
            filterGradient  = require('postcss-filter-gradient'),
            minifyCSS     = lazypipe()
                                .pipe(filter, mapFilter)
                                .pipe(rename, {suffix: '.min'})
                                    .pipe(cleanCSS, {
                                    compatibility: '*',
                                    level: 2,
                                    sourceMap: true,
                                    debug: true,
                                    specialComments: 'none',
                                })
                                .pipe(sourcemaps.write, '.')
                                .pipe(dest, '.'),
            pageRenameCSS = lazypipe()
                              .pipe(rename, function (path) {
                                  var dir = path.basename;
                                  if (dir === 'admin' || dir === 'editor') {
                                      path.dirname = '/assets/css';
                                  } else {
                                      path.dirname = dir + '/assets/css';
                                  }
                              })
                              .pipe(rename, {
                                  prefix: gulpSlug
                              });

    // PostCSS Plugins
    const   postCSSplugins = [
                inlineSVG({
                    path: imagesDistPath
                }),
                assets({
                    relative  : stylesDistPath,
                    loadPaths : [fontsPath, imagesDistPath]
                }),
                fontMagician({
                    formats: 'local woff2 woff ttf eot svg',
                    foundries: 'bootstrap custom',
                    custom: {
                        'Metropolis': {
                            variants: {
                                normal: {
                                    300: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-Light.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-Light.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-Light.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-Light.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-Light.svg'
                                        }
                                    },
                                    600: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-SemiBold.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-SemiBold.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-SemiBold.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-SemiBold.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-SemiBold.svg'
                                        }
                                    },
                                    800: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-ExtraBold.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-ExtraBold.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-ExtraBold.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-ExtraBold.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-ExtraBold.svg'
                                        }
                                    }
                                },
                                italic: {
                                    300: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-LightItalic.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-LightItalic.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-LightItalic.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-LightItalic.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-LightItalic.svg'
                                        }
                                    },
                                    600: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-SemiBoldItalic.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-SemiBoldItalic.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-SemiBoldItalic.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-SemiBoldItalic.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-SemiBoldItalic.svg'
                                        }
                                    },
                                    800: {
                                        url: {
                                            eot: '../fonts/Metropolis/Metropolis-ExtraBoldItalic.eot',
                                            woff2: '../fonts/Metropolis/Metropolis-ExtraBoldItalic.woff2',
                                            woff: '../fonts/Metropolis/Metropolis-ExtraBoldItalic.woff',
                                            ttf: '../fonts/Metropolis/Metropolis-ExtraBoldItalic.ttf',
                                            svg: '../fonts/Metropolis/Metropolis-ExtraBoldItalic.svg'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }),
                smoothGradients(),
                letterSpacing(),
                aspectRatio(),
                easings(),
                momentum(),
                fixes(),
                autoprefixer(),
                mmq({
                    sort: sortCSSmq
                })
            ];

    // Tasks ==================================================================
    function compileCSS(files, fileDest) {
        var errorFree = true,
            hasErrors = false;
        return src(files, {
            allowEmpty  : true,
            base        : './'
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.identityMap())
        .pipe(
            sass({
                errLogToConsole   : true,
                precision         : 10,
                sourceComments    : true,
                sourceMapContents : true,
                sourceMap         : true,
                indentWidth       : 4,
                importer          : globImporter(),
                includePaths: [
                    globalNode
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
                format        : 'beautify',
                compatibility : 'ie8',
                level         : 1,
                sourceMap     : true,
                debug         : true,
                inline        : ['all']
            })
        )
        .pipe(beautify.css({
            indent_size: 4
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(fileDest))
        .pipe(gif(isProd, minifyCSS()))
        .pipe(plumber.stop())
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function compilefontCSS() {
        // create an accumulated stream
        var fontStream = merge();

        [300, 600, 800].forEach(function(weight) {
            // a regular version
            fontStream.add(src(`./assets/fonts/metropolis-2/${weight}.woff`, {
                    allowEmpty  : true,
                    base        : './'
                }).pipe(inlineFonts({
                    name: 'Metropolis',
                    weight: weight,
                    formats: [
                        'eot',
                        'woff',
                        'woff2',
                        'ttf',
                        'svg'
                    ]
                })));

            // an italic version
            fontStream.add(src(`src/fonts/metropolis-2/${weight}-i.woff`, {
                    allowEmpty  : true,
                    base        : './'
                }).pipe(inlineFonts({
                    name: 'Metropolis',
                    weight: weight,
                    formats: [
                        'eot',
                        'woff',
                        'woff2',
                        'ttf',
                        'svg'
                    ],
                    style: 'italic'
                })));
        });

        return fontStream.pipe(concat('metropolis.css')).pipe(dest(stylesDistPath));
    }
    exports.compilefontCSS  = compilefontCSS;

    function compilePageCSS(files, fileDest) {
        var errorFree = true,
            hasErrors = false;
        return src(files, {
            allowEmpty  : true,
            base        : './',
            since: lastRun(compilePageCSS)
        })
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(changed(fileDest))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole   : true,
                precision         : 10,
                sourceComments    : true,
                sourceMapContents : true,
                sourceMap         : true,
                indentWidth       : 4,
                importer          : globImporter(),
                includePaths: [
                    globalNode,
                    stylesBuildPath
                ]
            })
        )
        .pipe(pageRenameCSS())
        .pipe(postcss(postCSSplugins))
        .pipe(lineec())
        .pipe(
            cleanCSS({
                format        : 'beautify',
                compatibility : 'ie8',
                level         : 1,
                sourceMap     : true,
                debug         : true,
                inline        : ['all']
            })
        )
        .pipe(beautify.css({
            indent_size: 4
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(fileDest))
        .pipe(gif(isProd, minifyCSS()))
        .pipe(plumber.stop())
        .pipe(gif(hasErrors, onErrors()))
        .pipe(gif(errorFree, onSuccess()));
    }

    function mainStyles(done) {
        compileCSS(mainSassFiles, stylesDistPath);
        done();
    }

    function adminStyles(done) {
        compilePageCSS(adminSassFiles, adminPath);
        done();
    }

    function pageStyles(done) {
        compilePageCSS(pageSassFiles, pagesPath);
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
    const   uglify            = require('gulp-uglify'),
            concat            = require('gulp-concat'),
            babel             = require('gulp-babel'),
            jshint            = require('gulp-jshint'),
            modernizr         = require('gulp-modernizr-build');
            jshintpkg.lookup  = false;


    // Variables ==============================================================
    const   jsValidate    = lazypipe()
                            .pipe(jshint, jshintpkg).pipe(jshint.reporter, 'jshint-stylish'),
            minifyJS      = lazypipe()
                            .pipe(filter, mapFilter)
                            .pipe(rename, {
                                suffix: '.min'
                            })
                            .pipe(stripComments, {
                                safe: false,
                                space: true
                            })
                            .pipe(uglify)
                            .pipe(sourcemaps.write, '.')
                            .pipe(dest, '.'),

            pageRenameJS  = lazypipe()
                            .pipe(rename, function (path) {
                                var dir = path.basename;
                                if (dir === 'admin' || dir === 'editor') {
                                    path.dirname = '/assets/js';
                                } else {
                                    path.dirname = dir + '/assets/js';
                                }
                            })
                            .pipe(rename, {prefix: gulpSlug});

    // Tasks ==================================================================

    // Main JS
        function compileJS(files, fileDest, fileBase = '') {
            var validate  = true,
                errorFree = true,
                hasErrors = false;
            return src(files, {
                allowEmpty  : true,
                base        : './',
            })
            .pipe(
                plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                })
            )
            .pipe(sourcemaps.init())
            .pipe(stripComments({
                safe: false,
                space: true
            }))
            .pipe(babel(babelConfig))
            .pipe(beautify.js({
                indent_size: 4
            }))
            .pipe(gif(validate, jsValidate()))
            .pipe(concat(fileBase + '.js'))
            .pipe(
                rename({
                    prefix    : gulpSlug,
                    dirname   : '',
                })
            )
            .pipe(beautify.js({
                indent_size: 4
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(fileDest))
            .pipe(gif(isProd, minifyJS()))
            .pipe(plumber.stop())
            .pipe(gif(hasErrors, onErrors()))
            .pipe(gif(errorFree, onSuccess()));
        }

    // Page JS
        function compilePageJS(files, fileDest) {
            var validate  = true,
                errorFree = true,
                hasErrors = false;
            return src(files, {
                allowEmpty  : true,
                base        : './',
            })
            .pipe(
                plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                })
            )
            .pipe(sourcemaps.init())
            .pipe(pageRenameJS())
            .pipe(stripComments({
                safe: false,
                space: true
            }))
            .pipe(babel(babelConfig))
            .pipe(gif(validate, jsValidate()))
            .pipe(beautify.js({
                indent_size: 4
            }))
            .pipe(dest(fileDest))
            .pipe(gif(isProd, minifyJS()))
            .pipe(plumber.stop())
            .pipe(sourcemaps.write('.'))
            .pipe(dest(fileDest))
            .pipe(gif(hasErrors, onErrors()))
            .pipe(gif(errorFree, onSuccess()));
        }

    // Vendor JS
        function compileModernizr() {
            var errorFree = true,
                hasErrors = false;
            return src([
                    pageJSFiles,
                    './inc/pages/**/assets/css/*.css',
                    './build/js/**/*.js',
                    stylesDistPath + '/*.css',
                    '!./**/*modernizr*.js'
                ], {
                allowEmpty: true,
                base: './',
            })
            .pipe(
                plumber({
                    errorHandler: notify.onError("Error: <%= error.message %>")
                })
            )
            .pipe(modernizr('01-modernizr.js', modernizrpkg))
            .pipe(stripComments({
                safe: false,
                space: true
            }))
            .pipe(beautify.js({
                indent_size: 4
            }))
            .pipe(dest(scriptsBuildPath + '/vendor'))
            .pipe(plumber.stop())
            .pipe(gif(hasErrors, onErrors()))
            .pipe(gif(errorFree, onSuccess()));
        }

        exports.compileModernizr     = compileModernizr;

        function createVendorJSList() {
            var vendorJSarray = [];
            Object.values(vendorJSFiles).forEach((item, index) => {
                vendorJSarray[index] = item;
            });
            var vendorJSarray = vendorJSarray.flat();
            return vendorJSarray;
        };
        const vendorJSList = createVendorJSList();

        function createVendorJSArray() {
            var vendorJSarray = [];
            Object.entries(vendorJSFiles).forEach((entry, i) => {
                let index = i + 2;
                let key = entry[0];
                let value = entry[1];
                vendorJSarray['0' + index + '-' + key] = value;
            });
            return vendorJSarray;
        };
        const vendorJSArray = createVendorJSArray();

        function copyVendorJS() {
            var errorFree = true,
                hasErrors = false;
            return src(vendorJSList, {
                    allowEmpty: true,
                    base: './',
                })
                .pipe(
                    plumber({
                        errorHandler: notify.onError("Error: <%= error.message %>")
                    })
                )
                .pipe(groupConcat(vendorJSArray))
                .pipe(plumber.stop())
                .pipe(dest(scriptsBuildPath + '/vendor'))
                .pipe(stripComments({
                    safe: false,
                    space: true
                }))
                .pipe(dest(scriptsBuildPath + '/vendor'))
                .pipe(gif(hasErrors, onErrors()))
                .pipe(gif(errorFree, onSuccess()));
        }

        function compileVendorJS() {
            var errorFree = true,
                hasErrors = false;
            return src(scriptsBuildPath + '/vendor/*.js', {
                    allowEmpty: true,
                    base: './'
                })
                .pipe(sourcemaps.init())
                .pipe(
                    plumber({
                        errorHandler: notify.onError("Error: <%= error.message %>")
                    })
                )
                .pipe(concat('vendor.js'))
                .pipe(
                    rename({
                        prefix: gulpSlug,
                        dirname: '',
                    })
                )
                .pipe(beautify.js({
                    indent_size: 4
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(dest(scriptsDistPath))
                .pipe(gif(isProd, minifyJS()))
                .pipe(plumber.stop())
                .pipe(gif(hasErrors, onErrors()))
                .pipe(gif(errorFree, onSuccess()));
        }

        function mainScripts(done) {
            compileJS(mainJSFiles, scriptsDistPath, 'main');
            done();
        }

        function adminScripts(done) {
            compilePageJS(adminJSFiles, adminPath)
            done();
        }

        function pageScripts(done) {
            compilePageJS(pageJSFiles, pagesPath);
            done();
        }

    exports.mainScripts     = mainScripts;
    exports.adminScripts    = adminScripts;
    exports.compileVendorJS = compileVendorJS;
    exports.vendorScripts   = series(compileModernizr, copyVendorJS, compileVendorJS);
    exports.pageScripts     = pageScripts;
    exports.scripts         = parallel(
                                mainScripts,
                                adminScripts,
                                series(
                                    compileModernizr,
                                    copyVendorJS,
                                    compileVendorJS
                                ),
                                pageScripts
                            );

/** ===========================================================================
Images
============================================================================ */

    // Plugins ================================================================
    const imagemin   = require('gulp-imagemin');

    // Tasks ==================================================================
    function images(done) {
        var imageFilter = filter([
            '**/*.png',
            '**/*.gif',
            '**/*.jpg',
            '**/*.jpeg',
            '**/*.svg'
        ], {
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
        done();
    }

    exports.images = images;

/** ===========================================================================
Watch
============================================================================ */

    // Variables ==============================================================
    const watchSassFiles = [
        stylesBuildPath + '/**/*.scss',
        './inc/components/**/assets/sass/*.scss'
    ];

    // Tasks ==================================================================
    function watchFiles() {
        watch(watchSassFiles, mainStyles);
        watch(adminSassFiles, adminStyles);
        watch(pageSassFiles, pageStyles);
        watch(mainJSFiles, mainScripts);
        watch(adminJSFiles, adminScripts);
        watch(pageJSFiles, pageScripts);
        watch(imageFiles, images);
    }
    exports.watch = watchFiles;

/** ===========================================================================
Build
============================================================================ */

    exports.mainBuild = parallel(mainStyles, mainScripts);
    exports.adminBuild= parallel(adminStyles, adminScripts);
    exports.pageBuild = parallel(pageStyles, pageScripts);
    exports.build     = series(
                            parallel(
                                images,
                                series(
                                    compileModernizr,
                                    copyVendorJS,
                                    compileVendorJS
                                )
                            ),
                            parallel(
                                adminStyles,
                                adminScripts,
                                mainStyles,
                                mainScripts,
                                pageStyles,
                                pageScripts
                            )
                        );
    exports.default   = series(
                            parallel(
                                images,
                                series(
                                    compileModernizr,
                                    copyVendorJS,
                                    compileVendorJS
                                    )
                            ),
                            parallel(
                                adminStyles,
                                adminScripts,
                                mainStyles,
                                mainScripts,
                                pageStyles,
                                pageScripts
                                )
                        );