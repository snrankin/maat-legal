/**
 * Task: `mainBuild`.
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS vendor files
 *     2. Concatenates all the files and generates vendors.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates vendors.min.js
 */

const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require('gulp-sass'), // Gulp pluign for Sass compilation.
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

// Utility related
var browserSync = require('browser-sync').create(),
    debug = require('gulp-debug'),
    filter = require('gulp-filter'),
    ftp = require('vinyl-ftp'),
    lineec = require('gulp-line-ending-corrector'),
    log = require('fancy-log'),
    merge = require('merge-stream'),
    newer = require('gulp-newer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    print = require('gulp-print').default,
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    stripComments = require('gulp-strip-comments'),
    watch = require('gulp-watch'),
    rev = require('gulp-rev'),
    revRewrite = require('gulp-rev-rewrite');

// =============================================================================
// CSS
// =============================================================================

const styleFiles = [
        'assets/sass/main.scss'
    ],
    styleWatch = [
        "assets/sass/**/*.scss",
        "inc/components/**/*.scss",
        "!inc/components/admin/**/*.scss",
        "!**/__kebabCase_name__.scss"
    ],
    styleDest = "assets/css";

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
                prefix: slug + '-',
                extname: '.css'
            })
        )
        .pipe(postcss(postCSSplugins))
        .pipe(gulp.dest(styleDest))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.'));
}


gulp.task('devStyles', compileDevStyles);

// Optimize Images
function images() {
    return gulp
        .src("./assets/imgs/src/**/*")
        .pipe(newer("./assets/imgs/"))
        .pipe(
            imagemin([
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
                        removeViewBox: false,
                        collapseGroups: true
                    }]
                })
            ])
        )
        .pipe(gulp.dest("./assets/imgs/"));
}

// export tasks
gulp.task('images', images);