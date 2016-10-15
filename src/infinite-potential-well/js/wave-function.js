"use strict";

function waveFunc(x, n, size) {
    return Math.sqrt(2 / size) * Math.sin(n * Math.PI * x / size);
}

module.exports = waveFunc;