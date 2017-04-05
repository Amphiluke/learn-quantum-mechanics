"use strict";

let slider = {
    init(items, {autoPlay = true, interval = 10000} = {}) {
        if (this.items) {
            return;
        }
        this.items = items;
        this.slideOrder = this.getRndOrder();
        this.activeIdx = this.slideOrder[Math.floor(Math.random() * this.slideOrder.length)];
        this.items[this.slideOrder[this.activeIdx]].classList.add("active");
        this.interval = Math.max(interval, 1500);
        if (autoPlay !== false) {
            this.play();
        }
    },

    getRndOrder() {
        let itemCount = this.items.length,
            result = new Array(itemCount);
        for (let currIdx = 0; currIdx < itemCount; currIdx++) {
            result[currIdx] = currIdx;
        }
        for (let currIdx = itemCount - 1; currIdx > 0; currIdx--) {
            let rndIdx = Math.floor(Math.random() * currIdx + 1);
            let tmpValue = result[currIdx];
            result[currIdx] = result[rndIdx];
            result[rndIdx] = tmpValue;
        }
        return result;
    },

    slide(index = slider.activeIdx + 1) {
        this.items[this.slideOrder[this.activeIdx]].classList.remove("active");
        this.activeIdx = index % this.slideOrder.length;
        this.items[this.slideOrder[this.activeIdx]].classList.add("active");
    },

    play() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => this.slide(), this.interval);
        }
    },

    pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },

    goto(index) {
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