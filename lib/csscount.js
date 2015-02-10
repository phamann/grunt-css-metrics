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
function traverse(o) {
  for (var i in o) {
    if (typeof o[i] === 'object') {
      if (o[i].type === 'rule') {
        countRules++;
        countSelectors += o[i].selectors.length;
        countDeclarations += o[i].declarations.length;
      }
      traverse(o[i]);
    }
  }
}

CSSCount.prototype = {
  fileSize: function() {
    return fs.statSync(this.path).size;
  },
  stats: function(callback) {
    countRules = 0;
    countSelectors = 0;
    countDeclarations = 0;
    traverse(this.parsedData);
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
      fileSize: fileSize
    });
  }
};

module.exports = CSSCount;