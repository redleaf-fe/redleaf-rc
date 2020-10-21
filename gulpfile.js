const gulp = require("gulp");
const babel = require("gulp-babel");
const less = require("gulp-less");
const watch = require("gulp-watch");
const rename = require("gulp-rename");
const { execSync } = require("child_process");
const markdown = require("./markdown");

const paths = {
  js: "src/**/*.*(tsx|ts)",
  less: "src/**/*.less",
  md: "src/**/*.md",
  others: "src/**/*.!(tsx|ts|js|less|md)",
  dist: "dist",
  site: "site/src/pages",
};

const pipeToDest = (instance) => instance.pipe(gulp.dest(paths.dist));

function task_js() {
  execSync(`tsc`);
  return pipeToDest(gulp.src(paths.js).pipe(babel()));
}

function task_css() {
  return pipeToDest(gulp.src(paths.less).pipe(less()));
}

function task_md() {
  return gulp
    .src(paths.md)
    .pipe(markdown())
    .pipe(
      rename(function (path) {
        path.basename = "index";
        path.extname = ".tsx";
      })
    )
    .pipe(gulp.dest(paths.site));
}

function copy() {
  return pipeToDest(gulp.src(paths.others));
}

gulp.task("watch", () => {
  watch(paths.js, task_js);
  watch(paths.less, task_css);
  watch(paths.md, task_md);
  watch(paths.others, copy);
});

gulp.task("build", gulp.parallel(task_js, task_css, task_md, copy));

gulp.task("dev", gulp.series("build", "watch"));
