var parse = require('css-parse');
var fs = require('fs');

function CSSCount(path) {
  this.path = path;
  this.file = fs.readFileSync(this.path, 'utf8');
  this.parsedData = parse(this.file).stylesheet;
}

var countRules;
var countSelectors;
var countDeclarations;
var nestingText;
var nestingArr;

function traverse(o) {
  for (var i in o) {
    if (typeof o[i] === 'object') {
      if (o[i].type === 'rule') {
        countRules++;
        countSelectors += o[i].selectors.length;
        for (var j = 0; j < o[i].selectors.length; j++) {
          selectorSplit(o[i].selectors[j] + ' ');
        };
        countDeclarations += o[i].declarations.length;
        continue;
      }
      traverse(o[i]);
    }
  }
}

function selectorSplit(selector) {
  nestingArr.push(selector.replace('>', ' ').replace('+', ' ').replace('~', ' ').replace(/\s\s+/g, ' ').split(' ').length - 1);
}

function calculateNesting() {
  nestingText = nestingArr;
}

CSSCount.prototype = {
  fileSize: function() {
    return fs.statSync(this.path).size;
  },
  stats: function(callback) {
    countRules = 0;
    countSelectors = 0;
    countDeclarations = 0;
    nestingText = '';
    nestingArr = [];
    traverse(this.parsedData);
    calculateNesting();
    var totalRules = countRules;
    var totalSelectors = countSelectors;
    var totalDeclarations = countDeclarations;
    var fileSize = this.fileSize();
    callback({
      totalRules: totalRules,
      totalSelectors: totalSelectors,
      totalDeclarations: totalDeclarations,
      selectorsPerRule: (totalSelectors/totalRules).toFixed(1),
      declarationsPerRule: (totalDeclarations/totalRules).toFixed(1),
      fileSize: fileSize,
      selectorsNesting: nestingText
    });
  }
};

module.exports = CSSCount;