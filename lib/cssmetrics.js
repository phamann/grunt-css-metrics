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
        return humanize.filesize(bytes);
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
        var totalRules = 0,
            l = this.parsedData.rules.length;

        for(var i=0; i < l; i++) {
            var rule = this.parsedData.rules[i];
            if(rule.type === 'rule') {
                totalRules++;
            }
            if(rule.type === 'media') {
                rule = this.parsedData.rules[i].rules;
                var k = rule.length;
                for(var j=0; j < k; j++) {
                    if(rule[j].type === 'rule') {
                        totalRules++;
                    }
                }
            }
        }
        return totalRules;
    },

    selectors: function() {
        var totalSelectors = 0,
            l = this.parsedData.rules.length;

        for(var i=0; i < l; i++) {
            var rule = this.parsedData.rules[i];
            if(rule.type === 'rule') {
                totalSelectors += rule.selectors.length;
            }
            if(rule.type === 'media') {
                rule = this.parsedData.rules[i].rules;
                var k = rule.length;
                for(var j=0; j < k; j++) {
                    if(rule[j].type === 'rule') {
                        totalSelectors += rule[j].selectors.length;
                    }
                }
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