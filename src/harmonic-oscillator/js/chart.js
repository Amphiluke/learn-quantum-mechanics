"use strict";

let utils = require("utils"),
    Chart = require("Chart"),
    waveFunction = require("wave-function.js");

let config = {
    type: "line",
    data: {
        datasets: [
            {borderColor: "#4d4d4d"},
            {borderColor: "#5da5da"},
            {borderColor: "#faa43a"},
            {borderColor: "#60bd68"},
            {borderColor: "#f17cb0"},
            {borderColor: "#b2912f"},
            {borderColor: "#b276b2"},
            {borderColor: "#decf3f"},
            {borderColor: "#f15854"},
            {borderColor: "#aaaaaa"},
            {borderColor: "#95b4ff"}
        ]
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

const m = utils.AMU, // hydrogen
    a0 = utils.BOHR_RADIUS,
    w = 9.140778e+13; // Hz

for (let [n, dataset] of config.data.datasets.entries()) {
    let data = dataset.data = [];
    for (let i = -3; i <= 3; i += 0.1) {
        data.push({x: i, y: waveFunction(i * a0, n, m, w)});
    }
    dataset.showLine = (n < 4);
}

let chart = {
    create(ctx, options) {
        if (this.chart) {
            return this.chart;
        }
        if (options && Array.isArray(options.visibleSeries)) {
            config.data.datasets.forEach((dataset, n) => {
                dataset.showLine = options.visibleSeries.includes(n);
            });
        }
        Object.defineProperty(this, "chart", {
            enumerable: true,
            value: new Chart(ctx, config)
        });
        return this.chart;
    },

    get visibleSeries() {
        return this.chart.data.datasets
            .map((dataset, index) => dataset.showLine ? index : -1)
            .filter(index => index > -1);
    },
    set visibleSeries(series) {
        this.chart.data.datasets.forEach((dataset, n) => {
            dataset.showLine = series.includes(n);
        });
        this.chart.update();
    },

    toggleSeries(n) {
        let dataset = this.chart.data.datasets[n];
        if (!dataset) {
            throw new Error(`Series #${n} doesn't exist`);
        }
        dataset.showLine = !dataset.showLine;
        this.chart.update();
    }
};

module.exports = chart;