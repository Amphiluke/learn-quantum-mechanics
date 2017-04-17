"use strict";

let utils = require("utils"),
    api = require("api"),
    chart = require("chart.js");

let ui = {
    elements: {
        form: document.getElementById("ipw-form"),
        canvas: document.getElementById("ipw-canvas"),
        switcher: document.getElementById("ipw-switcher"),
        checkboxes: document.body.querySelectorAll("#ipw-switcher input[type='checkbox']")
    },

    init() {
        if (utils.getQuery("controls") === "0") {
            this.elements.form.classList.add("hidden");
        }
        this.syncInputs();
        this.addEventHandlers();
    },

    addEventHandlers() {
        if (utils.getQuery("controls") !== "0") {
            this.elements.switcher.addEventListener("change", this.checkboxChangeHandler, false);
        }
    },

    checkboxChangeHandler({target}) {
        chart.toggleSeries(Number(target.value));
        api.emit("updateVisible");
    },

    syncInputs() {
        if (utils.getQuery("controls") !== "0") {
            let visibleSeries = chart.visibleSeries;
            [...this.elements.checkboxes].forEach((checkbox, index) => {
                checkbox.checked = visibleSeries.includes(index + 1);
            });
        }
    }
};

api.init({
    widget: "IPW",
    messageData: {
        updateVisible() {
            return chart.visibleSeries;
        }
    },
    methods: {
        /**
         * Change visibility of the chart series keeping visible only those whitelisted
         * @param {Array.<Number>} numbers - A list of series indices to make the only visible
         */
        showSeries(numbers) {
            if (!Array.isArray(numbers)) {
                throw new TypeError("showSeries: \"Unexpected argument type. Should be an array\"");
            }
            chart.visibleSeries = numbers;
            ui.syncInputs();
            api.emit("updateVisible");
        },

        /**
         * Toggle series visibility
         * @param {Number} n - Series index
         */
        toggleSeries(n) {
            if (!Number.isInteger(n)) {
                throw new TypeError("toggleSeries: \"Unexpected argument type. Should be an integer number\"");
            }
            chart.toggleSeries(n);
            ui.syncInputs();
            api.emit("updateVisible");
        }
    }
});

let visibleSeries = (utils.getQuery("n") || "1,2,3,4").split(",").map(Number);
chart.create(ui.elements.canvas, {visibleSeries});

ui.init();

document.body.classList.remove("loading");

module.exports = {};