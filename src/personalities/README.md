# Personalities

## Objective

The widget lists some of the most outstanding scientists who made foundational contributions to the development of quantum physics.

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/" scrolling="no" width="200" height="480" frameborder="0"></iframe>
```

There are two builds of the widget: the first one is for modern browsers (mb) that *do* [support ECMAScript 2015](https://kangax.github.io/compat-table/es6/), and the other one is for legacy browsers (lb) that *don't*. These builds provide the same functionality, but the build for modern browsers (mb) is believed to have better performance. However if you need support for IE then the build for legacy browsers (lb) is your choice. To use either of the two builds just choose the appropriate widget URL:

* `https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/` for modern browsers;
* `https://amphiluke.github.io/learn-quantum-mechanics/lb/personalities/` for legacy browsers.

### Customization

You may change the time of displaying a single slide using the `interval` parameter in the widget's URL (by default, `interval` is 10 seconds). For example to set the slide rotation time to 5 seconds (5000 ms), use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/?interval=5000
```