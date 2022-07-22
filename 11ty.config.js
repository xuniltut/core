const pluginMarkdownIt            = require('markdown-it');
const pluginYAML                  = require("js-yaml");
const pluginSyntaxHighlight       = require("@11ty/eleventy-plugin-syntaxhighlight");

// конфигурация Eleventy (11ty)
module.exports = function(eleventy) {

	eleventy.addPassthroughCopy('docs/**/!(*yml*)*.(png|jpg|webp)');

	// * добавление поддержки YAML-файлов для data
	eleventy.addDataExtension("yaml", contents => pluginYAML.load(contents));
	eleventy.addDataExtension('yml', contents => pluginYAML.load(contents));

	// * копирование папок в dist/
	eleventy.addPassthroughCopy({'@assets': 'assets'});
	eleventy.addPassthroughCopy({'@scripts': 'scripts'});

	eleventy.setUseGitIgnore(false); // * юзаем GitIgnore
	eleventy.setQuietMode(true);

	// ? Конфигурация pluginSyntaxHighlight
	eleventy.addPlugin(pluginSyntaxHighlight, {
		alwaysWrapLineHighlights: true,
		preAttributes: { tabindex: 0 }
	});

	// ? Конфигурация pluginMarkdownIt
	let libMarkdownIt = pluginMarkdownIt({
		html   : true,
		breaks : true,
		linkify: true
	});

	eleventy.setLibrary('md', libMarkdownIt); // активация библиотеки pluginMarkdownIt

	// ? Конфигурация BrowserConfig
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

	// ? Настройка сборки 11ty
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
