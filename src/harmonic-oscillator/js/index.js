"use strict";

var chart = require("./chart.js");

chart.create(document.getElementById("qho-canvas"));

document.getElementById("qho-switcher").addEventListener("change", function (e) {
    chart.toggleSeries(Number(e.target.nextSibling.nodeValue));
}, false);

module.exports = chart;