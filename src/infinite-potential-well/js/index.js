"use strict";

let utils = require("utils"),
    chart = require("chart.js");

let ui = {
    elements: {
        form: document.getElementById("ipw-form"),
        canvas: document.getElementById("ipw-canvas"),
        switcher: document.getElementById("ipw-switcher"),
        checkboxes: document.body.querySelectorAll("#ipw-switcher input[type='checkbox']")
    },

    init() {
        if (utils.getQuery("controls") !== "0") {
            this.syncInputs();
            this.addEventHandlers();
        } else {
            this.elements.form.classList.add("hidden");
        }
    },

    addEventHandlers() {
        this.elements.switcher.addEventListener("change", ({target}) => {
            chart.toggleSeries(Number(target.value));
        }, false);
    },

    syncInputs() {
        [...this.elements.checkboxes].forEach((checkbox, index) => {
            checkbox.checked = chart.isSeriesVisible(index + 1);
        });
    }
};

let visibleSeries = (utils.getQuery("n") || "1,2,3,4").split(",").map(Number);
chart.create(ui.elements.canvas, {visibleSeries});

ui.init();

document.body.classList.remove("loading");

module.exports = chart;