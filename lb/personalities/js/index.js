"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = require("utils"),
    api = require("api"),
    slider = require("slider.js");

var ui = {
    elements: {
        list: document.getElementById("pers-list"),
        toc: document.getElementById("toc"),
        tocBtn: document.getElementById("toc-btn")
    },

    init: function init() {
        slider.init(this.elements.list.children, {
            autoPlay: utils.getQuery("autoPlay") !== "0",
            interval: Number(utils.getQuery("interval")) || undefined
        });
        this.fillTOC();
        this.addEventHandlers();
        api.emit("listPersons");
    },
    fillTOC: function fillTOC() {
        var _elements = this.elements,
            list = _elements.list,
            toc = _elements.toc;

        toc.innerHTML = [].concat(_toConsumableArray(list.querySelectorAll(".pers-about > h2"))).map(function (header, index) {
            return "<li data-idx=\"" + index + "\">" + header.innerHTML + "</li>";
        }).join("");
    },
    addEventHandlers: function addEventHandlers() {
        var _elements2 = this.elements,
            list = _elements2.list,
            toc = _elements2.toc,
            tocBtn = _elements2.tocBtn;

        if (utils.getQuery("autoPlay") !== "0") {
            list.addEventListener("mouseenter", slider.pause, false);
            list.addEventListener("mouseleave", slider.play, false);
        }
        tocBtn.addEventListener("click", this.tocBtnHandler.bind(this), false);
        toc.addEventListener("click", this.tocHandler.bind(this), false);
    },
    tocBtnHandler: function tocBtnHandler() {
        slider.pause();
        this.elements.toc.classList.add("toc-show");
    },
    tocHandler: function tocHandler(_ref) {
        var target = _ref.target;

        var index = target.getAttribute("data-idx");
        if (typeof index === "string") {
            slider.goto(Number(index));
        }
        this.elements.toc.classList.remove("toc-show");
        if (utils.getQuery("autoPlay") !== "0") {
            slider.play();
        }
    }
};

api.init({
    widget: "PQM",
    messageData: {
        listPersons: function listPersons() {
            var persons = new Map();
            [].concat(_toConsumableArray(ui.elements.list.children)).forEach(function (slide) {
                var personId = slide.getAttribute("data-pers");
                var personName = slide.querySelector(".pers-about > h2").textContent;
                persons.set(personId, personName);
            });
            if (window._babelPolyfill) {
                // IE fallback, as it doesn't support structured cloning of Maps
                return [].concat(_toConsumableArray(persons)).reduce(function (o, _ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        key = _ref3[0],
                        val = _ref3[1];

                    o[key] = val;return o;
                }, {});
            }
            return persons;
        }
    },
    methods: {
        /**
         * Show the slide corresponding to the specified person
         * @param {String} pers - Person name as defined in the `data-pers` attributes
         */
        showSlide: function showSlide(pers) {
            var slides = [].concat(_toConsumableArray(ui.elements.list.children));
            var index = slides.findIndex(function (slide) {
                return slide.getAttribute("data-pers") === pers;
            });
            if (index > -1) {
                slider.goto(index);
            }
        }
    }
});

ui.init();

module.exports = {};