'use strict';

/**
 * Gulpfile.
 *
 * Implements:
 *     1. Live reloads browser with BrowserSync.
 *     2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps, CSS minification, and Merge Media Queries.
 *     3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *     4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *     5. Watches files for changes in CSS or JS.
 *     6. Watches files for changes in PHP.
 *     7. Corrects the line endings.
 *     8. InjectCSS instead of browser page reload.
 */

var config = require('./config/gulp-config.json'),
    pkg = require('./package.json');

/**
 * Load
 *
 * Load gulp plugins and passing them semantic names.
 */
var gulp = require('gulp'); // Gulp of course

// CSS related
var sass = require('gulp-sass'), // Gulp pluign for Sass compilation.
    glob = require('gulp-sass-glob'), // Gulp pluign for Sass globbing.
    autoprefixer = require('autoprefixer'), // Autoprefixing magic.
    mmq = require('css-mqpacker'), // Combine matching media queries into one media query definition.
    postcss = require('gulp-postcss'),
    aspectRatio = require('postcss-aspect-ratio'),
    assets = require('postcss-assets'),
    duplicates = require('postcss-discard-duplicates'),
    easings = require('postcss-easings'),
    inlineSVG = require('postcss-inline-svg'),
    postcssFocus = require('postcss-focus'),
    momentum = require('postcss-momentum-scrolling'),
    cleanCSS = require('gulp-clean-css');

// PostCSS Plugins
var postCSSplugins = [
    autoprefixer({
        browsers: config.browsers
    }),
    assets({
        relative: config.paths.styles,
        loadPaths: [config.paths.fonts, config.paths.images]
    }),
    aspectRatio(),
    easings(),
    inlineSVG({
        path: config.paths.images
    }),
    postcssFocus(),
    momentum(),
    duplicates(),
    mmq({
        sort: true
    })
];

// JS related
var uglify = require('gulp-uglify'), // Minifies JS files
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint');

// Image related
var imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related
var browserSync = require('browser-sync').create(),
    debug = require('gulp-debug'),
    filter = require('gulp-filter'),
    lineec = require('gulp-line-ending-corrector'),
    log = require('fancy-log'),
    newer = require('gulp-newer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    print = require('gulp-print').default,
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    stripComments = require('gulp-strip-comments'),
    watch = require('gulp-watch'),
    rev = require('gulp-rev'),
    revRewrite = require('gulp-rev-rewrite');

const styleFiles = [
        './assets/sass/style.scss'
    ],
    styleWatch = [
        './assets/sass/**/*.scss',
        './inc/components/**/*.scss',
        '!./inc/components/admin/**/*.scss',
        '!./**/__kebabCase_name__.scss'
    ],
    styleDest = 'assets/css';

function compileDevStyles() {
    return gulp
        .src(styleFiles)
        .pipe(
            plumber(function(error) {
                log(error.message);
                notify.onError('Error: <%= error.message %>');
                this.emit('end');
            })
        )
        .pipe(sourcemaps.init())
        .pipe(glob())
        .pipe(
            sass({
                errLogToConsole: true,
                precision: 10
            })
        )
        .pipe(
            rename({
                basename: 'main',
                extname: '.css'
            })
        )
        .pipe(postcss(postCSSplugins))
        .pipe(gulp.dest(styleDest))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.'));
}

exports.devStyles = compileDevStyles;