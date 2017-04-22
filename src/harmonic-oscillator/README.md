# Quantum Harmonic Oscillator

## Objective

The widget provides interactive wave function charts for the first 11 eigenstates (*n* = 0 to 10) of the [quantum harmonic oscillator](https://en.wikipedia.org/wiki/Quantum_harmonic_oscillator)

![Wave functions of the quantum harmonic oscillator](https://wikimedia.org/api/rest_v1/media/math/render/svg/c2db35ff46b5749f4413773aae33e6dff8acf529)

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/harmonic-oscillator/en.html" width="430" height="365" scrolling="no" frameborder="0"></iframe>
```

The widget URL you will use depends on whether [legacy browser support](../../README.md#browser-compatibility) is required or not, and also on which [localization of the widget](../../README.md#widget-localization) do you prefer. For example to embed Russian-localized widget with legacy browser support, use this URL: `https://amphiluke.github.io/learn-quantum-mechanics/lb/harmonic-oscillator/ru.html`.

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — a comma separated list of state numbers to display on the chart initially (defaults to `0,1,2,3`; allowed numbers are integers in the range `[0..10]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstates for *n* = 4 and *n* = 6, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/harmonic-oscillator/en.html?n=4,6&controls=0
```

### API

:warning: To use the widget API, first be sure to read the [common notes](../../README.md#widget-apis) on widget programming.

#### Methods

Here are the methods you may use for programming the widget.

##### `showSeries(numbers)`

Change visibility of the chart series keeping visible only those whitelisted. The `numbers` parameter is an array of integers corresponding to series indices (or quantum numbers `n`).

```javascript
// Show only series for n = {1, 3, 5}
widgetWindow.postMessage({method: "showSeries", args: [[1, 3, 5]]}, "https://amphiluke.github.io");
```

##### `toggleSeries(n)`

Toggle visibility of the series for the given quantum number `n`.

```javascript
// Toggle visibility of the series for n = 7
widgetWindow.postMessage({method: "toggleSeries", args: [7]}, "https://amphiluke.github.io");
```

#### Events

Events triggered by the widget can be identified by the value `"QHO"` (Quantum Harmonic Oscillator) of the `widget` property in the `message` event data.

```javascript
window.addEventListener("message", ({data, origin}) => {
    if (origin === "https://amphiluke.github.io" && data.widget === "QHO") {
        console.log("The event '%s' is triggered. Event data: %O", data.event, data.data);
    }
}, false);
```

The events provided by the widget are listed below.

##### `updateVisible`

The `updateVisible` event is sent every time the set of displayed series on the chart changes (e.g. when the user clicks the checkboxes above the chart). The `data` property in the event object is an array of visible series indices (quantum numbers `n`).