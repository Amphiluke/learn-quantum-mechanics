"use strict";

module.exports = Object.freeze({
    AMU: 1.660539040E-27, // atomic mass unit, kg

    BOHR_RADIUS: 5.2917721067E-11, // Bohr radius, m

    PLANCK_CONSTANT: 1.054571800E-34, // Planck constant, J*s

    factorial(n) {
        let result = 1;
        for (; n > 1; n--) {
            result *= n;
        }
        return result;
    }
});