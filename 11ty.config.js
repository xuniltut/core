const pluginMarkdownIt   = require('markdown-it');
const pluginYAML         = require("js-yaml");
const pluginHTMLMinifier = require("html-minifier");

// конфигурация Eleventy (11ty)
module.exports = function(eleventy) {

	eleventy.addPassthroughCopy('articles/**/!(*yml*)*.(png|jpg|webp)');

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

	eleventy.addTransform("pluginHTMLMinifier", function(content, outputPath) {

    if(outputPath && outputPath.endsWith(".html")) {

      let output = pluginHTMLMinifier.minify(content, {
				minifyCSS                  : true,
				minifyJS                   : true,
				minifyURLs                 : true,
				useShortDoctype            : true,
				removeComments             : true,
				removeScriptTypeAttributes : true,
				collapseWhitespace         : true,
				collapseInlineTagWhitespace: true,
				sortAttributes             : true,
				sortClassName              : true
      });

      return output;

    }

    return content;

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
