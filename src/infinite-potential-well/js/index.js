"use strict";

var chart = require("./chart.js");

chart.create(document.getElementById("ipw-canvas"));

document.getElementById("ipw-switcher").addEventListener("change", function (e) {
    chart.toggleSeries(Number(e.target.nextSibling.nodeValue));
}, false);

module.exports = chart;