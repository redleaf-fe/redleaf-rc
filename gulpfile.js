const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 3 versions"] });
const less = require("gulp-less");
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
    gulp
      .src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(less2css())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
  );
}

function task_css() {
  return pipeToDest(
    gulp
      .src(paths.less)
      .pipe(
        less({
          plugins: [autoprefix],
        })
      )
      .pipe(cleanCSS())
  );
}

gulp.task("build", gulp.parallel(task_js, task_css));
