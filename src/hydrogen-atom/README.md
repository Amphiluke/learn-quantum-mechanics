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

##### `setQuantumNumbers(n, l)`

Apply new quantum numbers `n` and `l` and update the chart.

```javascript
// Plot the chart for n=5 and l=1 
widgetWindow.postMessage({method: "setQuantumNumbers", args: [5, 1]}, "https://amphiluke.github.io");

// Update only the quantum number l 
widgetWindow.postMessage({method: "setQuantumNumbers", args: [, 3]}, "https://amphiluke.github.io");
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

* `widget` — a string `"HA"` (Hydrogen Atom). Useful for determining which widget has triggered the event (if you have more than one widget on the page);
* `event` — a string containing the event name;
* `data` — event specific data.

The events provided by the widget are listed below.

##### `changeQuantumNumbers`

The `changeQuantumNumbers` event is sent every time the values of quantum numbers change (e.g. when the user changes the values in the inputs above the chart). The actual values of the quantum numbers `n` and `l` are sent as the properties in the `data` object (so you can retrieve them as `data.n` and `data.l`).