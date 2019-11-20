var gulp = require("gulp");
var
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass');

    sass.compiler = require('node-sass');

gulp.task('imgs', function() {
  return gulp.src("app/images/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true
    }))
    .pipe(gulp.dest("dist/images"))
});

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('copyhtml', () => gulp
  .src('app/index.html')
  .pipe(gulp.dest('dist/'))
);

gulp.task('copycss', () => gulp
  .src('app/css/*.css')
  .pipe(gulp.dest('dist/css/'))
);

gulp.task('copyjs', () => gulp
  .src('app/js/*.js')
  .pipe(gulp.dest('dist/js/'))
);

gulp.task('scripts', () => gulp
  .src('app/js/custom-js/*.js')
  .pipe(gulp.dest('dist/js/custom-js/'))
);

gulp.task('copybpas', () => gulp
  .src('node_modules/bootstrap/*.*')
  .pipe(gulp.dest('dist/assets/'))
);

gulp.task('copybp', () => gulp
  .src('node_modules/bootstrap/*.*')
  .pipe(gulp.dest('app/assets/'))
);

gulp.task("watch", function() {
  gulp.watch("app/js/custom-js/*.js", ["scripts"]);
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/index.html', ['copyhtml']);
  gulp.watch('app/css/*.css', ['copycss']);
  gulp.watch('app/js/*.js', ['copyjs']);
  gulp.watch("app/images/*.+(jpg|jpeg|png|gif)", ["imgs"]);
});

gulp.task("default", ["copyhtml", "copyjs", "scripts", "copybp", "sass", "imgs", "watch"]);
