"use strict";

let utils = require("utils"),
    slider = require("slider.js");

let list = document.getElementById("pers-list"),
    toc = document.getElementById("toc");

slider.init(list.children, {interval: Number(utils.getQuery("interval")) || undefined});

list.addEventListener("mouseenter", slider.pause, false);
list.addEventListener("mouseleave", slider.play, false);

toc.innerHTML = [...list.querySelectorAll(".pers-about > h2")]
    .map((header, index) => `<li data-idx="${index}">${header.innerHTML}</li>`)
    .join("");

document.getElementById("toc-btn").addEventListener("click", () => {
    slider.pause();
    toc.classList.add("toc-show");
});

toc.addEventListener("click", ({target}) => {
    let index = target.getAttribute("data-idx");
    if (typeof index === "string") {
        slider.goto(Number(index));
    }
    toc.classList.remove("toc-show");
    slider.play();
}, false);

module.exports = {};