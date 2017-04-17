"use strict";

let utils = require("utils"),
    api = require("api"),
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
        if (utils.getQuery("controls") === "0") {
            this.elements.form.classList.add("hidden");
        }
        this.syncInputs();
        this.addEventHandlers();
    },

    addEventHandlers() {
        if (utils.getQuery("controls") !== "0") {
            let form = this.elements.form;
            form.addEventListener("change", this.quantumNumberChangeHandler.bind(this), false);
            form.addEventListener("submit", this.submitHandler.bind(this), false);
        }
    },

    quantumNumberChangeHandler({target}) {
        let value = target.value.replace(/\D/g, "");
        quantumNumbers[target.name] = Number(value);
        this.syncInputs();
        this.queueChartUpdate();
        api.emit("changeQuantumNumbers");
    },

    submitHandler(e) {
        e.preventDefault();
        this.queueChartUpdate(true);
    },

    syncInputs() {
        if (utils.getQuery("controls") !== "0") {
            let {numN, numL} = this.elements;
            numN.max = quantumNumbers.nMax;
            numN.min = quantumNumbers.nMin;
            numN.value = quantumNumbers.n;
            numL.max = quantumNumbers.lMax;
            numL.min = quantumNumbers.lMin;
            numL.value = quantumNumbers.l;
        }
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

api.init({
    widget: "HA",
    messageData: {
        changeQuantumNumbers() {
            return {n: quantumNumbers.n, l: quantumNumbers.l};
        }
    },
    methods: {
        /**
         * Apply new quantum numbers and update the chart
         * @param {Number} [n=quantumNumbers.n] - The principal quantum number
         * @param {Number} [l=quantumNumbers.l] - The angular momentum quantum number
         */
        setQuantumNumbers(n = quantumNumbers.n, l = quantumNumbers.l) {
            quantumNumbers.n = n;
            quantumNumbers.l = l;
            ui.syncInputs();
            ui.queueChartUpdate(true);
            api.emit("changeQuantumNumbers");
        }
    }
});

// Using `parseInt` to be sure that `undefined` won't be converted to 0
quantumNumbers.n = Number.parseInt(utils.getQuery("n"));
quantumNumbers.l = Number.parseInt(utils.getQuery("l"));
chart.create(ui.elements.canvas, quantumNumbers.n, quantumNumbers.l);

ui.init();

document.body.classList.remove("loading");

module.exports = {};