var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("browserify", function() {
  return browserify({entries: ["./lib/pagehook.js"], standalone: "Pagehook"})
    .bundle()
    .pipe(source("pagehook.js"))
    .pipe(gulp.dest("./dist"));
});
