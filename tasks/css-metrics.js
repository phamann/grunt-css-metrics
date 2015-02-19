var CSSCount = require('../lib/csscount');
var glob = require('glob');

module.exports = function(grunt) {
  grunt.registerMultiTask('csscount', 'CSS count', function() {
    var done = this.async();
    var options = this.options();

    function analyseFiles(files) {
      grunt.util.async.forEachSeries(files, function(path, next) {
        new CSSCount(path).stats(function(stats) {

          grunt.log.writeln('');
          grunt.log.writeln(path.grey);

          var printMe = 'Selectors: ' + stats.totalSelectors;
          printMe += ' | Declarations: ' + stats.totalDeclarations;
          printMe += ' | Rules: ' + stats.totalRules;
          printMe += ' | S/R: ' + stats.selectorsPerRule;
          printMe += ' | D/R: ' + stats.declarationsPerRule;
          printMe += ' || '+ Math.ceil((stats.fileSize/1000).toFixed()) + 'k';

          grunt.log.writeln(printMe);

          if (options.maxSelectors && (stats.totalSelectors > options.maxSelectors)) {
            grunt.fail.warn(path + ' exceeded maximum selector count!');
          }

          next();
        });
      }, function() {
        done();
      });
    }

    var filesToBeAnalysed = [];
    grunt.util.async.forEachSeries(this.data.src, function(f, next) {
      glob(f, options, function(er, files) {
        for (var j = 0; j < files.length; j++) {
          if (filesToBeAnalysed.indexOf(files[j]) < 0) {
            filesToBeAnalysed.push(files[j]);
          }
        }
        next();
      });
    }, function() {
      analyseFiles(filesToBeAnalysed);
    });

  });
};