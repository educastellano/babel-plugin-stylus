'use strict';

module.exports = function (babel) {
  var Plugin = babel.Plugin;
  var t = babel.types;

  //
  var argv = require('minimist')(process.argv.slice(2))
  var path = argv._[0]
  //

  return new Plugin('stylus', {
    visitor: {
      ImportDeclaration: {
        exit: function(node, parent, scope, file) {
            if (node && node.source && node.source.value && node.source.type === 'Literal') {
              if (node.source.value.indexOf('.styl') !== -1) {
                var fs = require('fs');
                var stylus = require('stylus')
                var filename = path + node.source.value
                var content = fs.readFileSync(filename, 'utf8');
                var css = stylus(content).render()
                var id = node.specifiers[0].local.name
                return t.variableDeclaration('var', [t.variableDeclarator(t.identifier(id), t.literal(css))])
              }
            }
        }
      }
    }
  });
};