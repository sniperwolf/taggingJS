###
# Simple Grunt File
#
# @link http://gruntjs.com/configuring-tasks
###
module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # Some Basic Vars
    jsCore: ""
    jsCoreFile: "<%= jsCore %>tagging.js"
    jsCoreFileMin: "<%= jsCore %>tagging.min.js"

    # JSHint
    jshint:
      options:
        jshintrc: '.jshintrc'

      all: ['<%= jsCoreFile %>']

    uglify:
      options:
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'

        mangle:
          except: ['jQuery']
      dist:
        files: [
          { src: ['<%= jsCoreFile %>'], dest: '<%= jsCoreFileMin %>' }
        ]

  # Loading Tasks
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', [ 'jshint', ]
  grunt.registerTask 'dist', [ 'jshint', 'uglify', ]
