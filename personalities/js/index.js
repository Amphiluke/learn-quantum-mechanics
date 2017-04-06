"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = require("utils"),
    slider = require("slider.js");

var list = document.getElementById("pers-list"),
    toc = document.getElementById("toc");

slider.init(list.children, { interval: Number(utils.getQuery("interval")) || undefined });

list.addEventListener("mouseenter", slider.pause, false);
list.addEventListener("mouseleave", slider.play, false);

toc.innerHTML = [].concat(_toConsumableArray(list.querySelectorAll(".pers-about > h2"))).map(function (header, index) {
    return "<li data-idx=\"" + index + "\">" + header.innerHTML + "</li>";
}).join("");

document.getElementById("toc-btn").addEventListener("click", function () {
    slider.pause();
    toc.classList.add("toc-show");
});

toc.addEventListener("click", function (_ref) {
    var target = _ref.target;

    var index = target.getAttribute("data-idx");
    if (typeof index === "string") {
        slider.goto(Number(index));
    }
    toc.classList.remove("toc-show");
    slider.play();
}, false);

module.exports = {};