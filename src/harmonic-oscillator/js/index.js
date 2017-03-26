"use strict";

let chart = require("./chart.js");

chart.create(document.getElementById("qho-canvas"));

document.getElementById("qho-switcher").addEventListener("change", ({target}) => {
    chart.toggleSeries(Number(target.nextSibling.nodeValue));
}, false);

module.exports = chart;