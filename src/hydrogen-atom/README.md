# Hydrogen Atom

## Objective

The widget provides an interactive chart displaying the radial part of the [wave function for a hydrogen atom](https://en.wikipedia.org/wiki/Hydrogen_atom#Wavefunction).

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/hydrogen-atom/en.html" width="430" height="365" scrolling="no" frameborder="0"></iframe>
```

The widget URL you will use depends on whether [legacy browser support](../../README.md#browser-compatibility) is required or not, and also on which [localization of the widget](../../README.md#widget-localization) do you prefer. For example to embed Russian-localized widget with legacy browser support, use this URL: `https://amphiluke.github.io/learn-quantum-mechanics/lb/hydrogen-atom/ru.html`.

### Customization

You may customize widget appearance and some of the defaults using the following optional GET parameters in the widget's URL:

* `n` — the principal quantum number of the state to display on the chart initially (defaults to `4`; should be integer in the range `[1..7]`);
* `l` — the angular momentum quantum number of the state to display on the chart initially (defaults to `2`; should be integer in the range `[0..n–1]`);
* `controls` — whether or not (`1` or `0`) to display the controls above the chart (defaults to `1`).

*E.g.:* To display eigenstate for *n* = 5 and *l* = 4, and hide controls, use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/hydrogen-atom/en.html?n=5&l=4&controls=0
```

### API

:warning: To use the widget API, first be sure to read the [common notes](../../README.md#widget-apis) on widget programming.

#### Methods

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

Events triggered by the widget can be identified by the value `"HA"` (Hydrogen Atom) of the `widget` property in the `message` event data.

```javascript
window.addEventListener("message", ({data, origin}) => {
    if (origin === "https://amphiluke.github.io" && data.widget === "HA") {
        console.log("The event '%s' is triggered. Event data: %O", data.event, data.data);
    }
}, false);
```

The events provided by the widget are listed below.

##### `changeQuantumNumbers`

The `changeQuantumNumbers` event is sent every time the values of quantum numbers change (e.g. when the user changes the values in the inputs above the chart). The actual values of the quantum numbers `n` and `l` are sent as the properties in the `data` object (so you can retrieve them as `data.n` and `data.l`).