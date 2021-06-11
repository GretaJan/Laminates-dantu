const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// const toFolder = 'dist', cssPath = 'src/scss/**/*.scss';

// //compile scss to css
// function style() {
//     // 1.find scss file
//     return gulp.src(cssPath)
//     // 2. pass that file through sass compiles
//         .pipe(sass())
//     //3. save the compiled css
//         .pipe(gulp.dest(toFolder))
//     //4. stream changes to all browser
//         .pipe(browserSync.stream())
// }

// function watch() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
//     gulp.watch(cssPath, style);
//     gulp.watch('./dist/**/.css', style);
//     gulp.watch('./*.html').on('change', browserSync.reload);
//     gulp.watch('./src/js/**/*.js').on('change', browserSync.reload)
// }

// exports.style = style;
// exports.watch = watch;

// const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourceMaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { src, series, parallel, dest } = require('gulp');

const jsPath = 'src/js/**/*.js';
const cssPath = 'src/scss/**/*.scss';
const imgPath = 'src/images/**/*';
const styleSRC = './dist/style.css';
const toFolder = './dist';

//compile scss to css
function style() {
    // 1.find scss file
    return gulp.src(cssPath)
    // 2. pass that file through sass compiles
        .pipe(sass())
    //3. save the compiled css
        .pipe(gulp.dest(toFolder))
    //4. stream changes to all browser
        .pipe(browserSync.stream())
}

// gulp.task('cssTask', function () {  
//      // 1.find scss file
//      return gulp.src(cssPath)
//      // 2. pass that file through sass compiles
//          .pipe(sass())
//      //3. save the compiled css
//          .pipe(gulp.dest(toFolder))
//      //4. stream changes to all browser
//          .pipe(browserSync.stream())
// })

//minify css
function minStyle() {
    return gulp.src(toFolder)
        .pipe(sourceMaps.init())
        .pipe(concat('main.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(dest(toFolder))
}

function imgTask() {
    return src(imgPath)
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{ removeViewBox: false }],
        //     interlaced: true,
        //     optimizationLevel: 4 // 0 to 7
        // }))
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function jsTask() {
    return src(jsPath)
        .pipe(sourceMaps.init())
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('./dist'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(cssPath, style);
    // gulp.watch('./dist/**/.css', minStyle);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch(jsPath).on('change', browserSync.reload)
}

exports.style = style;
exports.minStyle = minStyle;
// exports.imgTask = imgTask;
exports.watch = watch;
exports.jsTask = jsTask;
exports.default = parallel(style, jsTask, minStyle, watch)