grunt-css-count
===============

Grunt task to analyse CSS files and log simple metrics. Suitable to watch for 4096 limit in IE9.

Displays the count of CSS selectors, CSS declarations and CSS rules for every chosen file.

## Getting Started

This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin.

Currently there is no npm package for this plugin, but you could clone this repo and install the needed dependencies with the following commands (inside your Grunt directory):

```shell
cd node_modules
git clone https://github.com/orlinbox/grunt-css-count
cd grunt-css-count
npm install
```

Note: 'npm install' may require sudo.

## Options

### maxSelectors

Type: `Number`
Default: `∞`

Maximum number of selectors within CSS file. (Note: IE9 selector limit is 4096)

## Examples

### Configuration Example

Example of a Grunt config containing the csscount task.

```js
grunt.initConfig({
  csscount: {
    dev: {
      src: [
        'css/compiled/styles.css',
        'assets/styles/*.min.css'
      ],
      options: {
        maxSelectors: 4096
      }
    }
  }
});

grunt.loadNpmTasks('grunt-css-count');
grunt.registerTask('default', ['csscount']);

```

## Release History

### 0.2.0 (10th February 2015)

* Initial release of the rewritten module.

## Credits

* [@visionmedia](https://github.com/visionmedia) for the great [css-parse](https://github.com/visionmedia/css-parse) library.
* Original work from [@phamann](https://github.com/phamann)'s [grunt-css-metrics](https://github.com/phamann/grunt-css-metrics)
