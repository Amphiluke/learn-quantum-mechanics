"use strict";

var utils = require("utils"),
    api = require("api"),
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
        if (utils.getQuery("controls") === "0") {
            this.elements.form.classList.add("hidden");
        }
        this.syncInputs();
        this.addEventHandlers();
    },
    addEventHandlers: function addEventHandlers() {
        if (utils.getQuery("controls") !== "0") {
            var form = this.elements.form;
            form.addEventListener("change", this.quantumNumberChangeHandler.bind(this), false);
            form.addEventListener("submit", this.submitHandler.bind(this), false);
        }
    },
    quantumNumberChangeHandler: function quantumNumberChangeHandler(_ref) {
        var target = _ref.target;

        var value = target.value.replace(/\D/g, "");
        quantumNumbers[target.name] = Number(value);
        this.syncInputs();
        this.queueChartUpdate();
        api.emit("changeQuantumNumbers");
    },
    submitHandler: function submitHandler(e) {
        e.preventDefault();
        this.queueChartUpdate(true);
    },
    syncInputs: function syncInputs() {
        if (utils.getQuery("controls") !== "0") {
            var _elements = this.elements,
                numN = _elements.numN,
                numL = _elements.numL;

            numN.max = quantumNumbers.nMax;
            numN.min = quantumNumbers.nMin;
            numN.value = quantumNumbers.n;
            numL.max = quantumNumbers.lMax;
            numL.min = quantumNumbers.lMin;
            numL.value = quantumNumbers.l;
        }
    },
    queueChartUpdate: function queueChartUpdate(asap) {
        var _this = this;

        if (this.debounceTimerId) {
            clearTimeout(this.debounceTimerId);
        }
        this.debounceTimerId = setTimeout(function () {
            _this.updateChart();
            _this.debounceTimerId = null;
        }, asap ? 0 : 750);
    },
    updateChart: function updateChart() {
        chart.updateSeries(quantumNumbers.n, quantumNumbers.l);
    }
};

api.init({
    widget: "HA",
    messageData: {
        changeQuantumNumbers: function changeQuantumNumbers() {
            return { n: quantumNumbers.n, l: quantumNumbers.l };
        }
    },
    methods: {
        /**
         * Apply new quantum numbers and update the chart
         * @param {Number} [n=quantumNumbers.n] - The principal quantum number
         * @param {Number} [l=quantumNumbers.l] - The angular momentum quantum number
         */
        setQuantumNumbers: function setQuantumNumbers() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : quantumNumbers.n;
            var l = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : quantumNumbers.l;

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