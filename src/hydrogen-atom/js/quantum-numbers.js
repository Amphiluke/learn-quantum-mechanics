"use strict";

let n = 4,
    l = 2;

module.exports = {
    get nMax() {
        return 7;
    },
    get nMin() {
        return 1;
    },
    get lMax() {
        return n - 1; // l = 0, 1, ..., n - 1
    },
    get lMin() {
        return 0;
    },
    get n() {
        return n;
    },
    set n(value) {
        if (Number.isInteger(value) && value !== n && value <= this.nMax && value >= this.nMin) {
            n = value;
            l = Math.min(l, this.lMax);
        }
    },
    get l() {
        return l;
    },
    set l(value) {
        if (Number.isInteger(value) && value !== l && value <= this.lMax && value >= this.lMin) {
            l = value;
        }
    }
};
