var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    imageResize = require('gulp-image-resize'),
    webserver = require('gulp-webserver');


gulp.task('minifyCss', function() {
    gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(rename(function(path) {path.basename += "-mini";}))
        .pipe(gulp.dest('css'));
});

gulp.task('minifyHtml', function() {
    gulp.src('index.html')
        .pipe(minifyHTML())
        .pipe(rename(function(path) {path.basename += "-mini";}))
        .pipe(gulp.dest(''));
});

gulp.task('resizeImagesXLarge', function () {
    gulp.src('dev/images/sunset.jpg')
        .pipe(imageResize({
            width: 2400
        }))
        .pipe(rename(function(path) {path.basename += "-xlarge";}))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('resizeImagesLarge', function () {
    gulp.src('dev/images/sunset.jpg')
        .pipe(imageResize({
            width: 1200
        }))
        .pipe(rename(function(path) {path.basename += "-large";}))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('resizeImagesMedium', function () {
    gulp.src('dev/images/*.jpg')
        .pipe(imageResize({
            width: 768
        }))
        .pipe(rename(function(path) {path.basename += "-medium";}))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('resizeImagesSmall', function () {
    gulp.src('dev/images/*.jpg')
        .pipe(imageResize({
            width: 480
        }))
        .pipe(rename(function(path) {path.basename += "-small";}))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('resizeImagesThumb', function () {
    gulp.src(['imgSrc/*.jpg', 'imgSrc/*.png'])
    //gulp.src('views/images/*.*')
        .pipe(imageResize({
            width: 200
        }))
        .pipe(rename(function(path) {path.basename += "-thumb";}))
        .pipe(gulp.dest('img'));
});

gulp.task('transferCss', function() {
    gulp.src('css/styles.css')
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('transferSvg', function() {
    gulp.src('dev/images/cape.svg')
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});


gulp.task('watch', function(){
    gulp.watch('dev/css/*.css', ['minifyCss']);
});

gulp.task('default', ['resizeImagesThumb', 'webserver', 'watch']);
//gulp.task('default', ['transferCss', 'transferSvg', 'webserver', 'watch']);