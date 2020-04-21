-------
### ⚠️  PLEASE READ THE [INSTRUCTIONS](/INSTRUCTIONS.md) FOR GUIDELINES ON HOW TO START YOUR PACKAGE.
> Don't forget to remove this warning while updating this README.
-------

# {package-name}

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/{package-name}
[downloads-image]:https://img.shields.io/npm/dm/@moxy/{package-name}.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/{package-name}.svg
[build-status-url]:https://github.com/moxystudio/{package-name}/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/{package-name}/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/{package-name}
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/{package-name}/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/{package-name}
[david-dm-image]:https://img.shields.io/david/moxystudio/{package-name}.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/{package-name}?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/{package-name}.svg

{package-description}

## Installation

```sh
$ npm install @moxy/{package-name}
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

{package-motivation}

## Usage

{package-usage-example}

## API

{package-api-description}

#### {package-api-prop-example}

Type: `object`
Required: `true`

The `{package-api-prop-example}` has the following shape:
```js
{package-api-prop-example}: PropTypes.shape({
    foo: PropTypes.string,
    bar: PropTypes.arrayOf(PropTypes.object),
}).isRequired,
```

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `{package-name}` project with:

```sh
$ npm run build
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo.*

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
