"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var utils = require("utils"),
    Chart = require("Chart"),
    waveFunction = require("wave-function.js");

var config = {
    type: "line",
    data: {
        datasets: [{ borderColor: "#4d4d4d" }, { borderColor: "#5da5da" }, { borderColor: "#faa43a" }, { borderColor: "#60bd68" }, { borderColor: "#f17cb0" }, { borderColor: "#b2912f" }, { borderColor: "#b276b2" }, { borderColor: "#decf3f" }, { borderColor: "#f15854" }, { borderColor: "#aaaaaa" }, { borderColor: "#95b4ff" }]
    },
    options: {
        responsive: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom",
                gridLines: {
                    tickMarkLength: 5
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    tickMarkLength: 5
                },
                ticks: {
                    display: false
                }
            }]
        },
        tooltips: {
            enabled: false
        },
        elements: {
            line: {
                fill: false
            },
            point: {
                radius: 0,
                hoverRadius: 0
            }
        }
    }
};

var m = utils.AMU,
    // hydrogen
a0 = utils.BOHR_RADIUS,
    w = 9.140778e+13; // Hz

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = config.data.datasets.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            n = _step$value[0],
            dataset = _step$value[1];

        var data = dataset.data = [];
        for (var i = -3; i <= 3; i += 0.1) {
            data.push({ x: i, y: waveFunction(i * a0, n, m, w) });
        }
        dataset.showLine = n < 4;
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var chart = {
    create: function create(ctx, options) {
        if (this.chart) {
            return this.chart;
        }
        if (options && Array.isArray(options.visibleSeries)) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = config.data.datasets.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        n = _step2$value[0],
                        dataset = _step2$value[1];

                    dataset.showLine = options.visibleSeries.includes(n);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        Object.defineProperty(this, "chart", {
            enumerable: true,
            value: new Chart(ctx, config)
        });
        return this.chart;
    },
    toggleSeries: function toggleSeries(n) {
        var dataset = this.chart.data.datasets[n];
        if (!dataset) {
            throw new Error("Series #" + n + " doesn't exist");
        }
        dataset.showLine = !dataset.showLine;
        this.chart.update();
    },
    isSeriesVisible: function isSeriesVisible(n) {
        var dataset = this.chart.data.datasets[n];
        if (!dataset) {
            throw new Error("Series #" + n + " doesn't exist");
        }
        return dataset.showLine;
    }
};

module.exports = chart;