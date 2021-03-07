const gulp = require("gulp");
const babel = require("gulp-babel");
const less = require("gulp-less");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const less2css = require("./less2css");

const paths = {
  js: "src/**/*.*(tsx|ts)",
  less: "src/**/*.less",
  dist: "dist",
};

const pipeToDest = (instance) => instance.pipe(gulp.dest(paths.dist));

function task_js() {
  return pipeToDest(
    gulp.src(paths.js).pipe(less2css()).pipe(babel()).pipe(uglify())
  );
}

function task_css() {
  return pipeToDest(gulp.src(paths.less).pipe(less()).pipe(cleanCSS()));
}

gulp.task("build", gulp.parallel(task_js, task_css));
