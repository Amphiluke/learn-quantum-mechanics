# learn-quantum-mechanics

Simple interactive widgets for learning Quantum Mechanics.

## List of widgets

* [Infinite Potential Well](src/infinite-potential-well#infinite-potential-well)
* [Quantum Harmonic Oscillator](src/harmonic-oscillator#quantum-harmonic-oscillator)
* [Hydrogen Atom](src/hydrogen-atom#hydrogen-atom)
* [Personalities](src/personalities#personalities)

## Common usage notes

Use the following HTML to embed a widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/%WIDGET_NAME%/en.html" width="%WIDTH%" height="%HEIGHT%" scrolling="no" frameborder="0"></iframe>
```

:warning: *Note:* the constants `%WIDGET_NAME%`, `%WIDTH%`, and `%HEIGHT%` are specific to each widget. Find the appropriate values for them in the individual documentation for each widget (see the [links above](#list-of-widgets)).

### Browser compatibility

There are two builds of each widget: the first one is for modern browsers (mb) that *do* [support ECMAScript 2015](https://kangax.github.io/compat-table/es6/), and the other one is for legacy browsers (lb) that *don't*. Both kinds of builds provide the same functionality, but the build for modern browsers (mb) is believed to have better performance. However if you need support for IE then the build for legacy browsers (lb) is your choice. To use either of the two builds, just choose the appropriate widget URL:

* `https://amphiluke.github.io/learn-quantum-mechanics/mb/%WIDGET_NAME%/en.html` for modern browsers;
* `https://amphiluke.github.io/learn-quantum-mechanics/lb/%WIDGET_NAME%/en.html` for legacy browsers.

### Widget localization

Currently, two localizations are supported: English (en) and Russian (ru). To embed a widget in either of the two localizations, just choose an appropriate name of the widget document (either `en.html` or `ru.html`):

* `https://amphiluke.github.io/learn-quantum-mechanics/mb/%WIDGET_NAME%/en.html` a widget in English;
* `https://amphiluke.github.io/learn-quantum-mechanics/mb/%WIDGET_NAME%/ru.html` a widget in Russian.

### Widget customization

Most widgets provide the opportunity to customize their appearance and/or behavior through specific optional GET parameters. Find out the details on the supported GET parameters in the [docs specific to each widget](#list-of-widgets).

### Widget APIs

Most widgets also provide you with a way to interact with them programmatically in runtime via a simple programming interface based on the cross-document messaging API. These widgets expose a few methods you may invoke as well as events you may subscribe to.

#### Methods

All you need to invoke some of a widget's API methods is [posting a message](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to the widget iframe window.

```javascript
let widgetIframe = document.getElementById("widget-iframe-id"); // widget iframe DOM element
let widgetWindow = widgetIframe.contentWindow;
widgetWindow.postMessage({
    method: "method_name", // specify actual method name
    args: ["argument1", "argument2"] // pass any arguments required by the method
}, "https://amphiluke.github.io");
```

The detailed info on the methods provided by a widget can be found in the [docs specific to that widget](#list-of-widgets).

#### Events

You may subscribe to a widget events by adding the `message` event listener on the `window` object.

```javascript
window.addEventListener("message", ({data, origin}) => {
    if (origin === "https://amphiluke.github.io") {
        // work with the `data` object ...
        console.log("The event '%s' is triggered by the widget '%s'. Event data: %O",
            data.event, data.widget, data.data);
    }
}, false);
```

The `data` object sent with any widget induced event has the following properties:

* `widget` — a widget-specific string. Useful for determining which widget has triggered the event (if you have more than one widget on the page);
* `event` — a string containing the event name;
* `data` — event specific data.

The detailed info on the events triggered by a widget can be found in the [docs specific to that widget](#list-of-widgets).
