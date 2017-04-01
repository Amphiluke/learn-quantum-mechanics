"use strict";

let chart = require("chart.js");

chart.create(document.getElementById("ipw-canvas"));

document.getElementById("ipw-switcher").addEventListener("change", ({target}) => {
    chart.toggleSeries(Number(target.nextSibling.nodeValue));
}, false);

module.exports = chart;