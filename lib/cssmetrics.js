'use strict';
var parse = require('css-parse'),
    fs = require('fs'),
    bytesize = require('bytesize');

/* path is a path to the CSS file we are analyzing */
function CSSMetrics (path) {
    this.path = path;
    this.file = fs.readFileSync(this.path, 'utf8');
    this.fileStats = fs.statSync(this.path);
}

CSSMetrics.prototype = {

    constructor: CSSMetrics,

    /* Convenience method. Returns the result from
     css-parse and nothing more. */
    parse: function () {
        return parse(this.file);
    },

  /* The stats() method runs the parser, computes metrics, and returns an
     object containing said metrics, in the format:

     {
       rules: [NUMBER], (total number of rules parsed)
       totalSelectors: [NUMBER], (total number of selectors parsed)
       averageSelectors: [NUMBER] (the mean number of selectors per rule)
       averageSelectors: [NUMBER] (the mean number of selectors per rule)
     }
  */
    stats: function (callback) {
        var self = this,
            parsed = this.parse().stylesheet,
            rules = parsed.rules.length,
            totalSelectors = 0,
            averageSelectors;

        for(var i=0; i < rules; i++) {
            var rule = parsed.rules[i];
            if(rule.type === 'rule') {
                totalSelectors += parsed.rules[i].selectors.length;
            }
        }

        averageSelectors = +(totalSelectors / rules).toFixed(3);

        bytesize.fileSize(self.path, true, function(err, fileSize) {
            bytesize.gzipSize(self.path, true, function(err, gzipSize) {
                callback({
                    rules: rules,
                    totalSelectors: totalSelectors,
                    averageSelectors: averageSelectors,
                    fileSize: fileSize,
                    gzipSize: gzipSize
                });
            });
        });
    }
};

module.exports = CSSMetrics;