# react-contentful-image

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-contentful-image
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-contentful-image.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-contentful-image.svg
[build-status-url]:https://github.com/moxystudio/react-contentful-image/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-contentful-image/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-contentful-image
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-contentful-image/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-contentful-image
[david-dm-image]:https://img.shields.io/david/moxystudio/react-contentful-image.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-contentful-image?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-contentful-image.svg

A react image renderer that uses the Contentful Images API.

## Installation

```sh
$ npm install @moxy/react-contentful-image
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

[Contentful](https://www.contentful.com/) provides a very powerful [Images API](https://www.contentful.com/developers/docs/references/images-api/) that besides retrieving image files, provides manipulation features such as resizing, cropping and compressing.

This react component returns a `<picture>` element. If no manipulations are made, the `<picture>` contains at least one `<source>` element, otherwise it will have two `<source>`. It also contains the native `<img>` as fallback for browsers that do not support the `<picture>` element.

## Usage

```js
import React from 'react';
import ContentfulImage from '@moxy/react-contentful-image';

const src = "//images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg";

const MyComponent = (props) => (
    <div {...props}>
        <ContentfulImage
            image={ src }
            format="png"
            resize={ { width: 100, height: 100 } } />
    </div>
);

export default MyComponent;
```

## API

Besides the following supported props by the `<ContentfulImage>` component, additional props will be spread to the `<img>` element.

#### image

Type: `string` or `object` | Required: `true`

The actual image. It can be provided as an URL (`string`) or as a Contentful asset (`object`).


A Contentful asset usually has the following structure:

```js
{
    // ...
    fields: {
        // ...
        file: {
            // ...
            url: 'my-image-url',
            // ...
        },
        // ...
    },
    // ...
}
```

Thus, you can pass it to this component and the image will be properly handled.

Example:

```js
const src = 'my-image-url';

<ContentfulImage image={ src } />
```

or

```js
const { image } = page.fields;

<ContentfulImage image={ image } />
```

#### format

Type: `string` | Required: `false` | Default: `webp`

The new format to convert the image. The possibilities are:
- `webp`
- `jpg`
- `png`
- `progressive jpg`
- `8bit png`

Example:

```js
<ContentfulImage
    image={ src }
    format="progressive jpg" />
```

If no `format` prop is passed, this component will convert the image to [`webp`](https://developers.google.com/speed/webp) by default as it provides small images weight with high visual quality. The example above will override this default value and will convert the image to `progressive jpg`. If you want to keep your image format with no conversions, please see [`optimize` prop](#optimize).

ℹ️ Read more about Contentful Images API format conversion [here](https://www.contentful.com/developers/docs/references/images-api/#/reference/changing-formats).

#### resize

Type: `object` | Required: `false`

Resizing configuration object. This object has the following shape:
- `width` - Desired width
- `height` - Desired height
- `behavior` - Specifies the resizing behavior. The possible values are:
  - `pad`
  - `fill`
  - `scale`
  - `crop`
  - `thumb`
- `focusArea` - Specifies the focus area when resizing. The possible values are:
  - `top`
  - `right`
  - `bottom`
  - `left`
  - `center`
  - `top_right`
  - `top_left`
  - `bottom_right`
  - `bottom_left`
  - `face`
  - `faces`

Example:

```js
const resizeValues = {
    width: 100,
    height: 100,
    behavior: 'crop',
    focusArea: 'top_right'
};

// ...

<ContentfulImage
    image={ src }
    resize={ resizeValues } />
```

⚠️ Please, note the following warnings:
- The maximum value for both `width` and `height` properties is 4000 pixels.
- `focusArea` property won't have effect on the default or `scale` behavior.

ℹ️ Read more about resizing images with Contentful Images API [here](https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping).

#### cropRadius

Type: `string` or `number` | Required: `false`

Add rounded corners or create a circle/ellipsis. The possible values are:

- `max` keyword - Creates a full circle/ellipsis
- The size of the corner radius in pixels

Example:

```js
<ContentfulImage
    image={ src }
    cropRadius="max" />

// or

<ContentfulImage
    image={ src }
    cropRadius={ 30 } />
```

ℹ️ Read more about cropping images with Contentful Images API [here](https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/crop-rounded-corners-&-circle-elipsis).

#### quality

Type: `number` | Required: `false`

Sets the quality of the image. The value must be between **1** and **100**.

Example:

```js
<ContentfulImage
    image={ src }
    format="jpg"
    quality={ 10 } />
```

⚠️ This value will be ignored for 8-bit PNGs.

ℹ️ Read more about changing the image quality with Contentful Images API [here](https://www.contentful.com/developers/docs/references/images-api/#/reference/image-manipulation/quality).

#### backgroundColor

Type: `string` | Required: `false`

Sets the background color when using `cropRadius` or the `pad` behavior. Color hex code is expected as the value.

Example:

```js
<ContentfulImage
    image={ src }
    cropRadius="max"
    backgroundColor="#FFFFFF" />
```

ℹ️ Read more about changing the image background color with Contentful Images API [here](https://www.contentful.com/developers/docs/references/images-api/#/reference/image-manipulation/background-color).

#### optimize

Type: `bool` | Required: `false` | Default: `true`

If no `format` is passed, this component will use `webp` format as default. To convert to any other format, just use [`format` prop](#format) to override the default value. If you want to keep your image with no format manipulations set this prop to `false`.

Example:

```js
<ContentfulImage
    image={ src }
    optimize={ false } />
```


## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `react-contentful-image` project with:

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

Released under the [MIT License](./LICENSE).
