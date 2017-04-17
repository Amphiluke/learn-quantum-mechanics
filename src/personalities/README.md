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

You may customize some of the widget defaults using the following optional GET parameters in the widget's URL:

* `interval` — the time of displaying a single slide in ms (by default, `interval` is 10 seconds);
* `autoPlay` — enables (`1`) or disables (`0`) auto-rotation of slides (defaults to `1`). Disabling of auto-rotation is useful if you want to change slides programmatically through [widget's API](README.md#showslide).

*E.g.:* To set the slide rotation time to 5 seconds (5000 ms), use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/?interval=5000
```

### API

You may also interact with the widget programmatically via a simple programming interface based on the cross-document messaging API. The widget provides a few [methods](README.md#methods) you may invoke as well as [events](README.md#events) you may subscribe to.

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

##### `showSlide(pers)`

Show the slide with a person identified by the given predefined name. The details of how to get all the predefined person names is given in the description of the [`listPersons` event](README.md#listpersons).

```javascript
// Show the slide about Richard Feynman
widgetWindow.postMessage({method: "showSlide", args: ["Feynman"]}, "https://amphiluke.github.io");
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

* `widget` — a string `"PQM"` (Personalities in Quantum Mechanics). Useful for determining which widget has triggered the event (if you have more than one widget on the page);
* `event` — a string containing the event name;
* `data` — event specific data.

The events provided by the widget are listed below.

##### `listPersons`

The `listPersons` event is sent right after the widget initialisation. The `data` property in the event object is a map with predefined person names used as keys, and localized full person names as values. You will pass one of the predefined person names as an argument of the [`showSlide` method](README.md#showslide) to change slides programmatically.