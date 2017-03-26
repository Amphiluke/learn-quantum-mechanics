"use strict";

let Chart = require("Chart"),
    waveFunction = require("./wave-function.js");

let config = {
    type: "line",
    data: {
        datasets: [{
            borderColor: "#5da5da"
        }]
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

const maxDists = [6, 15, 30, 50, 75, 90, 120];

function makeData(n, l) {
    let data = [],
        max = maxDists[n] || maxDists[maxDists.length - 1],
        step = max / 100;
    for (let i = 0; i <= max; i += step) {
        data.push({x: i, y: waveFunction(i, n, l)});
    }
    return data;
}

let chart = {
    create(ctx, n, l) {
        if (this.chart) {
            this.updateSeries(n, l);
            return this.chart;
        }
        config.data.datasets[0].data = makeData(n, l);
        Object.defineProperty(this, "chart", {
            enumerable: true,
            value: new Chart(ctx, config)
        });
        return this.chart;
    },

    updateSeries(n, l) {
        this.chart.data.datasets[0].data = makeData(n, l);
        this.chart.update();
    }
};

module.exports = chart;