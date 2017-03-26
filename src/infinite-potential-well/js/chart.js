"use strict";

let Chart = require("Chart"),
    waveFunction = require("./wave-function.js");

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

const size = 10;

for (let [n, dataset] of config.data.datasets.entries()) {
    let data = dataset.data = [];
    for (let i = 0; i <= size; i += 0.1) {
        data.push({x: i, y: waveFunction(i, n + 1, size)});
    }
    dataset.showLine = (n < 4);
}

let chart = {
    create(ctx) {
        if (this.chart) {
            return this.chart;
        }
        Object.defineProperty(this, "chart", {
            enumerable: true,
            value: new Chart(ctx, config)
        });
        return this.chart;
    },

    toggleSeries(n) {
        let dataset = this.chart.data.datasets[n - 1];
        if (!dataset) {
            throw new Error(`Series #${n} doesn't exist`);
        }
        dataset.showLine = !dataset.showLine;
        this.chart.update();
    }
};

module.exports = chart;