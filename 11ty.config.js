const pluginMarkdownIt            = require('markdown-it');
const pluginYAML                  = require("js-yaml");

// конфигурация Eleventy (11ty)
module.exports = function(eleventy) {

	eleventy.addPassthroughCopy('docs/**/!(*yml*)*.(png|jpg|webp)');

	eleventy.addDataExtension("yaml", contents => pluginYAML.load(contents));
	eleventy.addDataExtension('yml', contents => pluginYAML.load(contents));

	eleventy.addPassthroughCopy({'@assets': 'assets'});
	eleventy.addPassthroughCopy({'@scripts': 'scripts'});

	eleventy.setUseGitIgnore(false);
	eleventy.setQuietMode(true);

	let libMarkdownIt = pluginMarkdownIt({
		html   : true,
		breaks : true,
		linkify: true
	});

	eleventy.setLibrary('md', libMarkdownIt);

	eleventy.setBrowserSyncConfig({
		server: {
			baseDir: ['./dist']
		},
		files: [
			'styles/**/*.*',
			'scripts/**/*.*'
		],
		ghostMode: false,
		watch    : true,
		notify   : false,
		ui       : false,
		open     : true,
		browser  : ["chromium-browser"] // "google chrome", "firefox"
	});

	return {
		dir: {
			input   : '.',
			output  : 'dist',
			includes: '@includes',
			layouts : '@layouts',
			data    : "@data"
		},
		templateFormats    : ['md', 'njk'],
		htmlTemplateEngine : 'njk',
		passthroughFileCopy: true,
		jsDataFileSuffix   : ".data"
	}

}
