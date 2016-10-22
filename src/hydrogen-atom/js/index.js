"use strict";

var chart = require("./chart.js");

var ui = {
    form: document.getElementById("ha-form"),
    canvas: document.getElementById("ha-canvas"),
    numN: document.getElementById("ha-num-n"),
    numL: document.getElementById("ha-num-l")
};

function fixInput(el) {
    var value = el.value,
        min, max;
    if (/\D/.test(value)) {
        el.value = value.replace(/\D/g, "");
    }
    value = Number(el.value);
    min = Number(el.min);
    max = Number(el.max);
    if (value < min) {
        el.value = min;
    } else if (value > max) {
        el.value = max;
    }
}

var debounceTimerId = null;

function queueChartUpdate(asap) {
    if (debounceTimerId) {
        clearTimeout(debounceTimerId);
    }
    debounceTimerId = setTimeout(updateChart, asap ? 0 : 750);
}

function updateChart() {
    chart.updateSeries(Number(ui.numN.value), Number(ui.numL.value));
    debounceTimerId = null;
}

chart.create(ui.canvas, Number(ui.numN.value), Number(ui.numL.value));

ui.form.addEventListener("change", function (e) {
    var target = e.target;
    fixInput(target);
    if (target === ui.numN) {
        ui.numL.max = target.value - 1; // l = 0, 1, ..., n - 1
        fixInput(ui.numL);
    }
    queueChartUpdate();
}, false);

ui.form.addEventListener("submit", function (e) {
    e.preventDefault();
    queueChartUpdate(true);
}, false);

module.exports = chart;