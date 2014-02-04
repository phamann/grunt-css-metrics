'use strict';
var parse = require('css-parse'),
    fs = require('fs'),
    humanize = require('humanize'),
    zlib = require('zlib');

function CSSMetrics (path) {
    this.path = path;
    this.file = fs.readFileSync(this.path, 'utf8');
    this.fileStats = fs.statSync(this.path);
    this.parsedData = parse(this.file).stylesheet;
}

CSSMetrics.prototype = {

    humanize: function(bytes) {
        // Humanize gets the short notation for bytes wrong
        // See https://github.com/milanvrekic/JS-humanize/issues/6
        // We need to uppercase the B in KB, MB and GB when needed
        var humanizedFilesize = humanize.filesize(bytes);

        if (humanizedFilesize.split(" ")[1].length === 2) {
            return humanizedFilesize.toUpperCase();
        }
        return humanizedFilesize;
    },

    fileSize: function() {
        return fs.statSync(this.path).size;
    },

    gzipSize: function(callback) {
        zlib.gzip(this.file, function(error, buffer) {
            callback(buffer.length);
        });
    },

    rules: function() {
        return this.parsedData.rules.length;
    },

    selectors: function() {
        var totalSelectors = 0,
            l = this.rules();

        for(var i=0; i < l; i++) {
            var rule = this.parsedData.rules[i];
            if(rule.type === 'rule') {
                totalSelectors += this.parsedData.rules[i].selectors.length;
            }
        }
        return totalSelectors;
    },

    stats: function (callback) {
        var self = this,
            rules = this.rules(),
            totalSelectors = this.selectors(),
            fileSize = this.fileSize();

        this.gzipSize(function(gzipSize) {
            callback({
                rules: rules,
                totalSelectors: totalSelectors,
                averageSelectors: +(totalSelectors / rules).toFixed(1),
                rawFileSize: fileSize,
                fileSize: self.humanize(fileSize),
                gzipSize: self.humanize(gzipSize)
            });
        });
    }
};

module.exports = CSSMetrics;