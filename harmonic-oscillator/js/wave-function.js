"use strict";

var utils = require("utils"),
    factorial = utils.factorial;

function hermite(x, n) {
    if (n < 0) {
        throw new Error("Invalid polynomial degree provided: " + n);
    }
    x *= 2;
    var sum = 0;
    for (var i = 0; i <= Math.floor(n / 2); i++) {
        var term = n - 2 * i;
        sum += Math.pow(x, term) * Math.pow(-1, i) / (factorial(i) * factorial(term));
    }
    return factorial(n) * sum;
}

function waveFunc(x, n, m, w) {
    var term = m * w / utils.PLANCK_CONSTANT;
    return 1 / Math.sqrt(Math.pow(2, n) * factorial(n)) * Math.pow(term / Math.PI, 0.25) * Math.exp(-term * x * x * 0.5) * hermite(Math.sqrt(term) * x, n);
}

module.exports = waveFunc;