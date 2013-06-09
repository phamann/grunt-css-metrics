'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        cssmetrics: {
            dev: {
                src: [
                    'test/global.min.css',
                    'test/head.min.css'
                ]
            }
        },

        jshint: {
            all: [
                'gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'cssmetrics:dev']);
};