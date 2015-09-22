'use strict';

require('string.prototype.endswith');
var fs 		= require('fs'),
	stylus 	= require('stylus'),
	argv 	= require('minimist')(process.argv.slice(2));

module.exports = function (babel) {
	var Plugin = babel.Plugin,
		t = babel.types;

	return new Plugin('stylus', {
		visitor: {
			ImportDeclaration: {
				exit: function(node, parent, scope, file) {
					if (node && node.source && node.source.value && node.source.type === 'Literal') {
						if (node.source.value.endsWith('.styl')) {
							var filename = argv._[0] + node.source.value,
								content = fs.readFileSync(filename, 'utf8'),
								css = stylus(content).render(),
								id = node.specifiers[0].local.name
							return t.variableDeclaration('var', [t.variableDeclarator(t.identifier(id), t.literal(css))])
						}
					}
				}
			}
		}
	});
};