var gulp = require("gulp");
var browserify = require("browserify");
var coffeeify = require("coffeeify");
var source = require("vinyl-source-stream");

gulp.task("browserify", function() {
  return browserify({entries: ["./src/pagehook.coffee"], standalone: "Pagehook", debug: true})
    .transform(coffeeify)
    .bundle()
    .pipe(source("pagehook.js"))
    .pipe(gulp.dest("./lib"));
});
