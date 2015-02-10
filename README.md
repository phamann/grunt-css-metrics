grunt-css-count
===============

Grunt task to analyse CSS files and log simple metrics. Suitable to watch for 4096 limit in IE9.

Displays the count of CSS selectors, CSS declarations and CSS rules for every chosen file.

## Getting Started

This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin.

Currently there is no npm package for this plugin, but you could clone this repo, and install the needed dependencies with the following commands:

```shell
git clone https://github.com/orlinbox/grunt-css-count
cd grunt-css-metrics
npm install
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-count');
```

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
      ]
    }
  }
});

grunt.loadNpmTasks('grunt-css-count');

grunt.registerTask('default', ['csscount']);

```

### Specifying Options

Example of using the [options](https://github.com/orlinbox/grunt-css-count#options).

```js
csscount: {
  dev: {
    src: [
      'assets/stylesheets/*.min.css'
    ],
    options: {
      maxSelectors: 4096
    }
  }
}
```

## Release History

### 0.2.0 (10th February 2015)

* Initial release

## Credits

* [@visionmedia](https://github.com/visionmedia) for the great [css-parse](https://github.com/visionmedia/css-parse) library.
* Original work from [@phamann](https://github.com/phamann)'s [grunt-css-metrics](https://github.com/phamann/grunt-css-metrics)
