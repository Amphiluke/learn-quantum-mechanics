"use strict";

let utils = require("utils"),
    chart = require("chart.js"),
    quantumNumbers = require("quantum-numbers.js");

let ui = {
    elements: {
        form: document.getElementById("ha-form"),
        canvas: document.getElementById("ha-canvas"),
        numN: document.getElementById("ha-num-n"),
        numL: document.getElementById("ha-num-l")
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
        let form = this.elements.form;
        form.addEventListener("change", ({target}) => {
            let value = target.value.replace(/\D/g, "");
            quantumNumbers[target.name] = Number(value);
            this.syncInputs();
            this.queueChartUpdate();
        }, false);

        form.addEventListener("submit", e => {
            e.preventDefault();
            this.queueChartUpdate(true);
        }, false);
    },

    syncInputs() {
        let numN = this.elements.numN,
            numL = this.elements.numL;
        numN.max = quantumNumbers.nMax;
        numN.min = quantumNumbers.nMin;
        numN.value = quantumNumbers.n;
        numL.max = quantumNumbers.lMax;
        numL.min = quantumNumbers.lMin;
        numL.value = quantumNumbers.l;
    },

    queueChartUpdate(asap) {
        if (this.debounceTimerId) {
            clearTimeout(this.debounceTimerId);
        }
        this.debounceTimerId = setTimeout(() => {
            this.updateChart();
            this.debounceTimerId = null;
        }, asap ? 0 : 750);
    },

    updateChart() {
        chart.updateSeries(quantumNumbers.n, quantumNumbers.l);
    }
};

// Using `parseInt` to be sure that `undefined` won't be converted to 0
quantumNumbers.n = Number.parseInt(utils.getQuery("n"));
quantumNumbers.l = Number.parseInt(utils.getQuery("l"));
chart.create(ui.elements.canvas, quantumNumbers.n, quantumNumbers.l);

ui.init();

document.body.classList.remove("loading");

module.exports = chart;