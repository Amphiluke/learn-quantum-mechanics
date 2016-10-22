"use strict";

var utils = require("utils"),
    factorial = utils.factorial;

// Generalized Laguerre polynomials of degree n
function laguerre(x, a, n) {
    if (n < 0) {
        throw new Error("Invalid polynomial degree provided: " + n);
    }
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return 1 + a - x;
    }
    // Apply recurrence relation
    return ((2 * n - 1 + a - x) * laguerre(x, a, n - 1) - (n - 1 + a) * laguerre(x, a, n - 2)) / n;
}

function waveFunc(r, n, l) {
    var normFactor;
    if (l > n - 1) {
        throw new Error("Invalid quantum numbers provided");
    }
    normFactor = 2 / (n * n) * Math.sqrt(factorial(n - l - 1) / Math.pow(factorial(n + l), 3));
    return normFactor * Math.exp(-r / n) * Math.pow(2 * r / n, l) * laguerre(2 * r / n, 2 * l + 1, n - l - 1);
}

module.exports = waveFunc;