'use strict';

const dir = {
  src:'./src/',
  build:'./build/'
};

const { series, parallel, src, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const ghpages = require('gh-pages');
const path = require('path');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
var concat = require('gulp-concat');






function styles() {
  return src(`${dir.src}scss/style.scss`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 version'], grid: true}),
    ]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(`${dir.build}css/`))
    .pipe(browserSync.stream());
}
exports.styles = styles;

function copyHTML() {
  return src(`${dir.src}*.html`)
    .pipe(plumber())
    .pipe(dest(dir.build));
}
exports.copyHTML = copyHTML;

function copyImg() {
  return src(`${dir.src}img/*.{jpg,jpeg,png,gif,svg,webp}`)
    .pipe(plumber())
    .pipe(dest(`${dir.build}img/`));
}
exports.copyImg = copyImg;

function copyMp3() {
  return src(`${dir.src}mp3/*`)
    .pipe(plumber())
    .pipe(dest(`${dir.build}mp3/`));
}
exports.copyMp3 = copyMp3;

function buildSvgSprite() {
  return src(`${dir.src}svgSprites/*.svg`)
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: { minify: true }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(dest(`${dir.build}img/`));
}
exports.buildSvgSprite = buildSvgSprite;

function copyFonts() {
  return src(`${dir.src}fonts/*.{woff,woff2}`)
    .pipe(plumber())
    .pipe(dest(`${dir.build}fonts/`));
}
exports.copyFonts = copyFonts;

function copyVendorsJs() {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-validation/dist/jquery.validate.js',
    '3rdparties/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
    '3rdparties/jquery-ui/jquery-ui.js',
    '3rdparties/inputmask/jquery.inputmask.js',
    'node_modules/swiper/dist/js/swiper.min.js',
    'node_modules/svg4everybody/dist/svg4everybody.min.js',
    ])
    .pipe(concat('bundle.js')) 
    .pipe(dest(`${dir.build}js/`));
}
exports.copyVendorsJs = copyVendorsJs;


exports.bundle = function()
{
  return src(dest(`${dir.build}js/*.js`)) .pipe(concat('file123.js')) .pipe(gulp.dest('./toPutBundledJsHere/'));
}



function copyVendorsCss() {
  return src([
    './node_modules/swiper/dist/css/swiper.min.css',

    ])
    .pipe(dest(`${dir.build}css/`));
}
exports.copyVendorsCss = copyVendorsCss;


function javascript() {
  return src(`${dir.src}js/script.js`)
      .pipe(plumber())
      .pipe(webpackStream({
        mode: 'development',
        output: {
          filename: 'script.js',
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        externals: {
           jquery: 'jQuery'
         }
      }))
      .pipe(dest(`${dir.build}js`))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(`${dir.build}js`));
}
exports.javascript = javascript;

function clean() {
  return del(dir.build)
}
exports.clean = clean;

function deploy(cb) {
  ghpages.publish(path.join(process.cwd(), dir.build), cb);
}
exports.deploy = deploy;



function serve() {
  browserSync.init({
    server: dir.build,
    startPath: 'index.html',
    open: false,
    port: 8080,
  });
  watch(`${dir.src}scss/**/*.scss`, { delay: 100 }, styles);
  watch(`${dir.src}*.html`).on('change', series(
    copyHTML,
    browserSync.reload
  ));
  watch(`${dir.src}js/**/*.js`).on('change', series(
    javascript,
    browserSync.reload
  ));
  watch(`${dir.src}svgSprites/*.svg`).on('all', series(
    buildSvgSprite,
    browserSync.reload
  ));
}

function buildSteps() {
  return parallel(styles, copyHTML, copyImg, copyMp3, buildSvgSprite, copyVendorsJs, copyVendorsCss, copyFonts, javascript);
}
exports.default = series(
  clean,
  buildSteps(),
  serve
);
exports.build = series(
  clean,
  buildSteps()
);
