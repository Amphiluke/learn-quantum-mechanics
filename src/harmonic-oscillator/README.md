# Quantum Harmonic Oscillator

## Objective

The widget provides interactive wave function charts for the first 11 eigenstates (*n* = 0 to 10) of the [quantum harmonic oscillator](https://en.wikipedia.org/wiki/Quantum_harmonic_oscillator)

![Wave functions of the quantum harmonic oscillator](https://wikimedia.org/api/rest_v1/media/math/render/svg/c2db35ff46b5749f4413773aae33e6dff8acf529)

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/harmonic-oscillator/" scrolling="no" width="430" height="365" frameborder="0"></iframe>
```

There are two builds of the widget: the first one is for modern browsers (mb) that *do* [support ECMAScript 2015](https://kangax.github.io/compat-table/es6/), and the other one is for legacy browsers (lb) that *don't*. These builds provide the same functionality, but the build for modern browsers (mb) is believed to have better performance. However if you need support for IE then the build for legacy browsers (lb) is your choice. To use either of the two builds just choose the appropriate widget URL:

* `https://amphiluke.github.io/learn-quantum-mechanics/mb/harmonic-oscillator/` for modern browsers;
* `https://amphiluke.github.io/learn-quantum-mechanics/lb/harmonic-oscillator/` for legacy browsers.

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — a comma separated list of state numbers to display on the chart initially (defaults to `0,1,2,3`; allowed numbers are integers in the range `[0..10]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstates for *n* = 4 and *n* = 6, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/harmonic-oscillator/?n=4,6&controls=0
```