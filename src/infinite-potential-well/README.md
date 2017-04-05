# Infinite Potential Well

## Objective

The widget provides interactive wave function charts for the first 11 eigenstates (*n* = 1 to 11) of a one-dimensional [particle in a box](https://en.wikipedia.org/wiki/Particle_in_a_box)

![Wave functions of a particle in a box](https://wikimedia.org/api/rest_v1/media/math/render/svg/25ea50d4377c0d7b784c37d5407bec4dbd1c1840)

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/infinite-potential-well/" scrolling="no" width="430" height="365" frameborder="0"></iframe>
```

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — a comma separated list of state numbers to display on the chart initially (defaults to `1,2,3,4`; allowed numbers are integers in the range `[1..11]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstates for *n* = 4 and *n* = 6, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/infinite-potential-well/?n=4,6&controls=0
```