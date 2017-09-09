var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
// var babel = require("gulp-babel");
// var webpack = require('gulp-webpack');

var BABEL = false;

var watcher = gulp.watch("src/*.ts", ["default"]);
watcher.on("change", function(e){
  console.log("File " + e.path + " was " + e.type + ", running tasks...");
});

gulp.task("default", ["typescript", "babel"]);

gulp.task("typescript", function(){
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(BABEL ? ".ts" : "js"));
});

gulp.task("babel", ["typescript"], function(){
  if (BABEL){
    return gulp.src(".ts/*.js").
      pipe(babel({
        presets: ["latest", "stage-0"]
      })).on("error", function(e){
        console.error(">>> ERROR:");
        console.error(e);
        this.emit("end");
      }).pipe(gulp.dest("dist"));
  }
});
