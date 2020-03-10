const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel');

gulp.task('clean', async function(){
    del.sync('dist')
});

gulp.task('css', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browserSync.reload({stream: true}))

});

gulp.task('scss', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
             cascade: false
        }))
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
    return gulp.src('dist/**/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    // .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}))

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('export', async function(){
    const buildHtml = gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));

    const buildCss = gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    const buildJs = gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    const buildImg = gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img'));

    const buildFonts = gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/**/*.html', gulp.parallel('html'));
    gulp.watch('src/js/**/*.js', gulp.parallel('js'));
});

gulp.task('build', gulp.series('clean', 'export'));
gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));
