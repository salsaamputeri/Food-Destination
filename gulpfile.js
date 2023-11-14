const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

function minifyCSS() {
  return gulp.src(['src/styles/style.css', 'src/styles/responsive.css'])
    .pipe(rename(['style.min.css', 'responsive.min.css']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
}

exports.default = gulp.parallel(minifyCSS);
