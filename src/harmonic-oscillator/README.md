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

### API

You may also interact with the widget programmatically via a simple programming interface based on the cross-document messaging API. The widget provides a few [methods](#methods) you may invoke as well as [events](#events) you may subscribe to.

#### Methods

All you need to invoke some of the widget's API methods is [posting a message](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to the widget iframe window.

```javascript
let widgetIframe = document.getElementById("widget-iframe-id"); // widget iframe DOM element
let widgetWindow = widgetIframe.contentWindow;
widgetWindow.postMessage({
    method: "method_name", // specify actual method name
    args: ["argument1", "argument2"] // pass any arguments required by the method
}, "https://amphiluke.github.io");
```

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

You may subscribe to the widget events by adding the `message` event listener on the `window` object.

```javascript
window.addEventListener("message", ({data, origin}) => {
    if (origin === "https://amphiluke.github.io") {
        // work with the `data` object ...
    }
}, false);
```

The `data` object sent with any widget event has the following properties:

* `widget` — a string `"QHO"` (Quantum Harmonic Oscillator). Useful for determining which widget has triggered the event (if you have more than one widget on the page);
* `event` — a string containing the event name;
* `data` — event specific data.

The events provided by the widget are listed below.

##### `updateVisible`

The `updateVisible` event is sent every time the set of displayed series on the chart changes (e.g. when the user clicks the checkboxes above the chart). The `data` property in the event object is an array of visible series indices (quantum numbers `n`).