"use strict";

var slider = {
    init: function init(items) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$autoPlay = _ref.autoPlay,
            autoPlay = _ref$autoPlay === undefined ? true : _ref$autoPlay,
            _ref$interval = _ref.interval,
            interval = _ref$interval === undefined ? 10000 : _ref$interval;

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
    getRndOrder: function getRndOrder() {
        var itemCount = this.items.length,
            result = new Array(itemCount);
        for (var currIdx = 0; currIdx < itemCount; currIdx++) {
            result[currIdx] = currIdx;
        }
        for (var _currIdx = itemCount - 1; _currIdx > 0; _currIdx--) {
            var rndIdx = Math.floor(Math.random() * _currIdx + 1);
            var tmpValue = result[_currIdx];
            result[_currIdx] = result[rndIdx];
            result[rndIdx] = tmpValue;
        }
        return result;
    },
    slide: function slide() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : slider.activeIdx + 1;

        this.items[this.slideOrder[this.activeIdx]].classList.remove("active");
        this.activeIdx = index % this.slideOrder.length;
        this.items[this.slideOrder[this.activeIdx]].classList.add("active");
    },
    play: function play() {
        var _this = this;

        if (!this.intervalId) {
            this.intervalId = setInterval(function () {
                return _this.slide();
            }, this.interval);
        }
    },
    pause: function pause() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },
    goto: function goto(index) {
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