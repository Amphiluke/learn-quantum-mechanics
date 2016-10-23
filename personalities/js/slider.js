"use strict";

var slider = {
    init: function (items, autoPlay) {
        if (this.items) {
            return;
        }
        this.items = items;
        this.slideOrder = this.getRndOrder();
        this.activeIdx = this.slideOrder[Math.floor(Math.random() * this.slideOrder.length)];
        this.items[this.slideOrder[this.activeIdx]].classList.add("active");
        if (autoPlay !== false) {
            this.play();
        }
    },

    getRndOrder: function () {
        var itemCount = this.items.length,
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
    },

    slide: function (index) {
        var nextIndex = (index === undefined) ? this.activeIdx + 1 : index;
        this.items[this.slideOrder[this.activeIdx]].classList.remove("active");
        this.activeIdx = nextIndex % this.slideOrder.length;
        this.items[this.slideOrder[this.activeIdx]].classList.add("active");
    },

    play: function () {
        if (!this.intervalId) {
            this.intervalId = setInterval(this.slide.bind(this), 10000);
        }
    },

    pause: function () {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },

    goto: function (index) {
        index %= this.slideOrder.length;
        if (index !== this.slideOrder[this.activeIdx]) {
            this.slide(this.slideOrder.indexOf(index));
        }
    }
};

module.exports = {
    init: slider.init.bind(slider),
    play: slider.play.bind(slider),
    pause: slider.pause.bind(slider),
    goto: slider.goto.bind(slider)
};