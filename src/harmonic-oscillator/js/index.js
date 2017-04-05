"use strict";

let utils = require("utils"),
    chart = require("chart.js");

let ui = {
    elements: {
        form: document.getElementById("qho-form"),
        canvas: document.getElementById("qho-canvas"),
        switcher: document.getElementById("qho-switcher"),
        checkboxes: document.body.querySelectorAll("#qho-switcher input[type='checkbox']")
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
            checkbox.checked = chart.isSeriesVisible(index);
        });
    }
};

let visibleSeries = (utils.getQuery("n") || "0,1,2,3").split(",").map(Number);
chart.create(ui.elements.canvas, {visibleSeries});

ui.init();

document.body.classList.remove("loading");

module.exports = chart;