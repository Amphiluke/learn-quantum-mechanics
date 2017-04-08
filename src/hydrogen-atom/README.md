# Hydrogen Atom

## Objective

The widget provides an interactive chart displaying the radial part of the [wave function for a hydrogen atom](https://en.wikipedia.org/wiki/Hydrogen_atom#Wavefunction).

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/hydrogen-atom/" scrolling="no" width="430" height="365" frameborder="0"></iframe>
```

There are two builds of the widget: the first one is for modern browsers (mb) that *do* [support ECMAScript 2015](https://kangax.github.io/compat-table/es6/), and the other one is for legacy browsers (lb) that *don't*. These builds provide the same functionality, but the build for modern browsers (mb) is believed to have better performance. However if you need support for IE then the build for legacy browsers (lb) is your choice. To use either of the two builds just choose the appropriate widget URL:

* `https://amphiluke.github.io/learn-quantum-mechanics/mb/hydrogen-atom/` for modern browsers;
* `https://amphiluke.github.io/learn-quantum-mechanics/lb/hydrogen-atom/` for legacy browsers.

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — the principal quantum number of the state to display on the chart initially (defaults to `4`; should be integer in the range `[1..7]`);
* `l` — the angular momentum quantum number of the state to display on the chart initially (defaults to `2`; should be integer in the range `[0..n–1]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstate for *n* = 5 and *l* = 4, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/hydrogen-atom/?n=5&l=4&controls=0
```