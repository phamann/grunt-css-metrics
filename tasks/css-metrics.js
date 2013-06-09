'use strict';
var CSSMetrics = require('../lib/cssmetrics'),
    glob = require('glob');

module.exports = function (grunt) {

    grunt.registerMultiTask('cssmetrics', 'Analyse CSS metrics', function () {

        var done = this.async(),
            options = this.options();

        function analyseFiles(files) {
            grunt.util.async.forEachSeries(files, function(path, next) {

                new CSSMetrics(path).stats(function(stats) {

                    grunt.log.subhead('Metrics for ' + path);

                    grunt.log.ok(['Total rules: ' + stats.rules]);
                    grunt.log.ok(['Total selectors: ' + stats.totalSelectors]);
                    grunt.log.ok(['Average selectors per rule: ' + stats.averageSelectors]);
                    grunt.log.ok(['File size: ' + stats.fileSize]);
                    grunt.log.ok(['GZip size: ' + stats.gzipSize]);

                    next();

                });
            }, function() {
                done();
            });
        }

        var filesToBeAnalysed = [];

        grunt.util.async.forEachSeries(this.data.src, function(f, next) {
            glob(f, options, function (er, files) {

                for (var j = 0; j < files.length; j++) {
                    if (filesToBeAnalysed.indexOf(files[j]) < 0) {
                        filesToBeAnalysed.push(files[j]);
                    }
                }

                next();
            });
        }, function () {
            analyseFiles(filesToBeAnalysed);
        });

    });

};