/* jshint node: true */

module.exports = function (grunt) {
	'use strict';

  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
            ' * -----------------------------------------------------\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> by @dotzweer\n' +
            ' * -----------------------------------------------------\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' */\n\n',
    filename: 'jquery.<%= pkg.name %>',

    // Task Configuration

    // Distribution Cleaning
    clean: {
      dist: ['dist']
    },

    // LESS Compilation
    recess: {
      options: {
        compile: true,
        banner: '<%= banner %>'
      },

      zview: {
        src: ['less/style.less'],
        dest: 'dist/css/<%= filename %>.css'
      },

      min: {
        options: {
          compress: true
        },

        src: ['<%= recess.zview.src[0] %>'],
        dest: 'dist/css/<%= filename %>.min.css'
      }
    },

    // JS Minification
    uglify: {
      options: {
        banner: '<%= banner %>'
      },

      zview: {
        options: {
          compress: true
        },
        src: ['<%= concat.zview.dest %>'],
        dest: 'dist/js/<%= filename %>.min.js'
      }
    },

    // Creating the test server
    connect: {
      zview: {
        options: {
          keepalive: true,
          port: 4000
        }
      }
    },

    // Concurrent tasks
    concurrent: {
      dist: {
        tasks: ['dist-css', 'dist-js']
      },

      watch: {
        tasks: ['watch:js', 'watch:css']
      },

      development: {
        tasks: ['watch:js', 'watch:css', 'connect:zview']
      }
    },

    // Watch tasks
    watch: {
      js: {
        files: ['src/**.js'],
        tasks: ['dist-js']
      },

      css: {
        files: ['less/**.less'],
        tasks: ['dist-css']
      }
    },

    // Concat Task, for the JS Files
    concat: {
      options: {
        banner: '<%= banner %><%= grunt.file.read("src/helpers/intro.js") %>\n\n',
        footer: '\n\n<%= grunt.file.read("src/helpers/outro.js") %>'
      },

      zview: {
        src: [
          'src/core.js'
        ],
        dest: 'dist/js/<%= filename %>.js'
      }
    },

    jshint: {
      options: {
        jshintrc: 'src/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['<%= concat.zview.dest %>']
      }
    }
  });

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('dist-css', ['recess:zview', 'recess:min']);
  grunt.registerTask('dist-js', ['concat:zview', 'uglify:zview']);
  grunt.registerTask('dist', ['concurrent:dist']);

  grunt.registerTask('default', ['clean', 'dist']);

  grunt.registerTask('validation', ['jshint']);

  grunt.registerTask('development', ['default', 'concurrent:watch']);
  grunt.registerTask('development:connect', ['default', 'concurrent:development']);
};