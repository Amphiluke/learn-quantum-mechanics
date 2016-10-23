"use strict";

var slider = require("./slider.js");

var list = document.getElementById("pers-list"),
    toc = document.getElementById("toc");

slider.init(list.children);

list.addEventListener("mouseenter", slider.pause, false);
list.addEventListener("mouseleave", slider.play, false);

toc.innerHTML = Array.prototype.slice.call(list.querySelectorAll(".pers-about > h2"), 0).map(function (header, index) {
    return "<li data-idx='" + index + "'>" + header.innerHTML + "</li>";
}).join("");

document.getElementById("toc-btn").addEventListener("click", function () {
    slider.pause();
    toc.classList.add("toc-show");
});

toc.addEventListener("click", function (e) {
    var index = e.target.getAttribute("data-idx");
    if (typeof index === "string") {
        slider.goto(Number(index));
    }
    toc.classList.remove("toc-show");
    slider.play();
}, false);

module.exports = {};