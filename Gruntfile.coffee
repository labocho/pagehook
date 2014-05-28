module.exports = (grunt) ->
  pkg = grunt.file.readJSON "package.json"
  grunt.initConfig
    watch:
      files: ["src/**/*.coffee"]
      tasks: ["coffee", "uglify"]

    coffee:
      compile:
        options:
          sourceMap: true
        files: [
          expand: true,
          cwd: "src",
          src: ["*.coffee"],
          dest: "lib",
          ext: ".js"
        ]

    uglify:
      compress_target:
        options:
          sourceMap: true
          sourceMapName: (fileName) ->
            fileName.replace /\.js$/, ".js.map"
        files: [
          expand: true
          cwd: "lib"
          src: ["pagehook.js"]
          dest: "lib"
          ext: ".min.js"
        ]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.registerTask("default", ["coffee", "uglify"])

