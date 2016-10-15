"use strict";

var list = document.getElementById("pers-list"),
    items = list.children,
    activeIdx,
    slideOrder,
    intervalId;

function slide() {
    items[slideOrder[activeIdx]].classList.remove("active");
    activeIdx = ++activeIdx % slideOrder.length;
    items[slideOrder[activeIdx]].classList.add("active");
}

// Randomize slide order
slideOrder = (function () {
    var itemCount = items.length,
        result = new Array(itemCount),
        currIdx, rndIdx, tmpValue;
    for (currIdx = 0; currIdx < itemCount; currIdx++) {
        result[currIdx] = currIdx;
    }
    for (currIdx = itemCount - 1; currIdx > 0; currIdx--) {
        rndIdx = Math.floor(Math.random() * currIdx + 1);
        tmpValue = result[currIdx];
        result[currIdx] = result[rndIdx];
        result[rndIdx] = tmpValue;
    }
    return result;
})();

activeIdx = slideOrder[Math.floor(Math.random() * slideOrder.length)];
items[slideOrder[activeIdx]].classList.add("active");

list.addEventListener("mouseenter", function () {
    clearInterval(intervalId);
}, false);

list.addEventListener("mouseleave", function () {
    intervalId = setInterval(slide, 5000);
}, false);

intervalId = setInterval(slide, 5000);

module.exports = {};