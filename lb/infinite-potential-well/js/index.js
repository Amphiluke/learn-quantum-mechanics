"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = require("utils"),
    api = require("api"),
    chart = require("chart.js");

var ui = {
    elements: {
        form: document.getElementById("ipw-form"),
        canvas: document.getElementById("ipw-canvas"),
        switcher: document.getElementById("ipw-switcher"),
        checkboxes: document.body.querySelectorAll("#ipw-switcher input[type='checkbox']")
    },

    init: function init() {
        if (utils.getQuery("controls") === "0") {
            this.elements.form.classList.add("hidden");
        }
        this.syncInputs();
        this.addEventHandlers();
    },
    addEventHandlers: function addEventHandlers() {
        if (utils.getQuery("controls") !== "0") {
            this.elements.switcher.addEventListener("change", this.checkboxChangeHandler, false);
        }
    },
    checkboxChangeHandler: function checkboxChangeHandler(_ref) {
        var target = _ref.target;

        chart.toggleSeries(Number(target.value));
        api.emit("updateVisible");
    },
    syncInputs: function syncInputs() {
        if (utils.getQuery("controls") !== "0") {
            var _visibleSeries = chart.visibleSeries;
            [].concat(_toConsumableArray(this.elements.checkboxes)).forEach(function (checkbox, index) {
                checkbox.checked = _visibleSeries.includes(index + 1);
            });
        }
    }
};

api.init({
    widget: "IPW",
    messageData: {
        updateVisible: function updateVisible() {
            return chart.visibleSeries;
        }
    },
    methods: {
        /**
         * Change visibility of the chart series keeping visible only those whitelisted
         * @param {Array.<Number>} numbers - A list of series indices to make the only visible
         */
        showSeries: function showSeries(numbers) {
            if (!Array.isArray(numbers)) {
                throw new TypeError("showSeries: \"Unexpected argument type. Should be an array\"");
            }
            chart.visibleSeries = numbers;
            ui.syncInputs();
            api.emit("updateVisible");
        },


        /**
         * Toggle series visibility
         * @param {Number} n - Series index
         */
        toggleSeries: function toggleSeries(n) {
            if (!Number.isInteger(n)) {
                throw new TypeError("toggleSeries: \"Unexpected argument type. Should be an integer number\"");
            }
            chart.toggleSeries(n);
            ui.syncInputs();
            api.emit("updateVisible");
        }
    }
});

var visibleSeries = (utils.getQuery("n") || "1,2,3,4").split(",").map(Number);
chart.create(ui.elements.canvas, { visibleSeries: visibleSeries });

ui.init();

document.body.classList.remove("loading");

module.exports = {};