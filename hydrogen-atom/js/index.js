"use strict";

var utils = require("utils"),
    chart = require("chart.js"),
    quantumNumbers = require("quantum-numbers.js");

var ui = {
    elements: {
        form: document.getElementById("ha-form"),
        canvas: document.getElementById("ha-canvas"),
        numN: document.getElementById("ha-num-n"),
        numL: document.getElementById("ha-num-l")
    },

    init: function init() {
        if (utils.getQuery("controls") !== "0") {
            this.syncInputs();
            this.addEventHandlers();
        } else {
            this.elements.form.classList.add("hidden");
        }
    },
    addEventHandlers: function addEventHandlers() {
        var _this = this;

        var form = this.elements.form;
        form.addEventListener("change", function (_ref) {
            var target = _ref.target;

            var value = target.value.replace(/\D/g, "");
            quantumNumbers[target.name] = Number(value);
            _this.syncInputs();
            _this.queueChartUpdate();
        }, false);

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            _this.queueChartUpdate(true);
        }, false);
    },
    syncInputs: function syncInputs() {
        var numN = this.elements.numN,
            numL = this.elements.numL;
        numN.max = quantumNumbers.nMax;
        numN.min = quantumNumbers.nMin;
        numN.value = quantumNumbers.n;
        numL.max = quantumNumbers.lMax;
        numL.min = quantumNumbers.lMin;
        numL.value = quantumNumbers.l;
    },
    queueChartUpdate: function queueChartUpdate(asap) {
        var _this2 = this;

        if (this.debounceTimerId) {
            clearTimeout(this.debounceTimerId);
        }
        this.debounceTimerId = setTimeout(function () {
            _this2.updateChart();
            _this2.debounceTimerId = null;
        }, asap ? 0 : 750);
    },
    updateChart: function updateChart() {
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