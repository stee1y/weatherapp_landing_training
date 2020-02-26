const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const rimraf = require('rimraf');



gulp.task('serve', function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch("app/**/*").on('change', browserSync.reload);
});

gulp.task("html", function () {
    return gulp.src("src/html/index.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("app/"))
});

gulp.task('scss', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}  ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('js', function() {
    return gulp.src("src/js/*.js")
        .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('img', function () {
    return gulp.src("src/images/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest("app/images"));
});

gulp.task("fonts", function () {
   return gulp.src("src/fonts/**/*.*")
       .pipe(gulp.dest("app/fonts"))
});

gulp.task("copy", gulp.parallel("img", "fonts"));

gulp.task("watch", function () {
   gulp.watch("src/html/*.html", gulp.series("html"));
   gulp.watch("src/scss/main.scss", gulp.series("scss"));
   gulp.watch("src/js/*.js", gulp.series("js"));
});

gulp.task('del', function (cb) {
    return rimraf("app", cb)
});

gulp.task("default", gulp.series(
    "del",
    gulp.parallel("html", "scss", "js", "copy"),
    gulp.parallel("watch", "serve")
));


