"use strict";

let utils = require("utils"),
    factorial = utils.factorial;

// Generalized Laguerre polynomials of degree n
function laguerre(x, a, n) {
    switch (n) {
        case 0:
            return 1;
        case 1:
            return 1 + a - x;
        default:
            if (n < 0) {
                throw new Error(`Invalid polynomial degree provided: ${n}`);
            }
            // Apply recurrence relation
            return ((2 * n - 1 + a - x) * laguerre(x, a, n - 1) - (n - 1 + a) * laguerre(x, a, n - 2)) / n;
    }
}

function waveFunc(r, n, l) {
    if (l > n - 1) {
        throw new Error("Invalid quantum numbers provided");
    }
    let normFactor = 2 / (n * n) * Math.sqrt(factorial(n - l - 1) / Math.pow(factorial(n + l), 3));
    return normFactor * Math.exp(-r / n) * Math.pow(2 * r / n, l) * laguerre(2 * r / n, 2 * l + 1, n - l - 1);
}

module.exports = waveFunc;