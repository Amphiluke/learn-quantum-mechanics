# Personalities

## Objective

The widget lists some of the most outstanding scientists who made foundational contributions to the development of quantum physics.

## Usage

Use the following HTML to embed the widget into your website:

```html
<iframe src="https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/en.html" width="200" height="480" scrolling="no" frameborder="0"></iframe>
```

The widget URL you will use depends on whether [legacy browser support](../../README.md#browser-compatibility) is required or not, and also on which [localization of the widget](../../README.md#widget-localization) do you prefer. For example to embed Russian-localized widget with legacy browser support, use this URL: `https://amphiluke.github.io/learn-quantum-mechanics/lb/personalities/ru.html`.

### Customization

You may customize some of the widget defaults using the following optional GET parameters in the widget's URL:

* `interval` — the time of displaying a single slide in ms (by default, `interval` is 10 seconds);
* `autoPlay` — enables (`1`) or disables (`0`) auto-rotation of slides (defaults to `1`). Disabling of auto-rotation is useful if you want to change slides programmatically through [widget's API](#showslidepers).

*E.g.:* To set the slide rotation time to 5 seconds (5000 ms), use the following URL:
```
https://amphiluke.github.io/learn-quantum-mechanics/mb/personalities/en.html?interval=5000
```

### API

:warning: To use the widget API, first be sure to read the [common notes](../../README.md#widget-apis) on widget programming.

#### Methods

Here are the methods you may use for programming the widget.

##### `showSlide(pers)`

Show the slide with a person identified by the given predefined name. The details of how to get all the predefined person names is given in the description of the [`listPersons` event](#listpersons).

```javascript
// Show the slide about Richard Feynman
widgetWindow.postMessage({method: "showSlide", args: ["Feynman"]}, "https://amphiluke.github.io");
```

#### Events

Events triggered by the widget can be identified by the value `"PQM"` (Personalities in Quantum Mechanics) of the `widget` property in the `message` event data.

```javascript
window.addEventListener("message", ({data, origin}) => {
    if (origin === "https://amphiluke.github.io" && data.widget === "PQM") {
        console.log("The event '%s' is triggered. Event data: %O", data.event, data.data);
    }
}, false);
```

The events provided by the widget are listed below.

##### `listPersons`

The `listPersons` event is sent right after the widget initialisation. The `data` property in the event object is a map with predefined person names used as keys, and localized full person names as values. You will pass one of the predefined person names as an argument of the [`showSlide` method](#showslidepers) to change slides programmatically.