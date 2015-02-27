module.exports = function(grunt) {

  grunt.initConfig({
    csscount: {
      dev: {
        src: [
          'test/style.css'
        ],
        options: {
          maxSelectors: 4000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-css-count');

  grunt.registerTask('default', ['csscount']);

};