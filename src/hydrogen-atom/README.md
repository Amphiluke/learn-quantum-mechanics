# Hydrogen Atom

## Objective

The widget provides an interactive chart displaying the radial part of the [wave function for a hydrogen atom](https://en.wikipedia.org/wiki/Hydrogen_atom#Wavefunction).

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/hydrogen-atom/" scrolling="no" width="430" height="365" frameborder="0"></iframe>
```

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — the principal quantum number of the state to display on the chart initially (defaults to `4`; should be integer in the range `[1..7]`);
* `l` — the angular momentum quantum number of the state to display on the chart initially (defaults to `2`; should be integer in the range `[0..n–1]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstate for *n* = 5 and *l* = 4, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/hydrogen-atom/?n=5&l=4&controls=0
```