"use strict";

let utils = require("utils"),
    api = require("api"),
    slider = require("slider.js");

let ui = {
    elements: {
        list: document.getElementById("pers-list"),
        toc: document.getElementById("toc"),
        tocBtn: document.getElementById("toc-btn")
    },

    init() {
        slider.init(this.elements.list.children, {
            autoPlay: utils.getQuery("autoPlay") !== "0",
            interval: Number(utils.getQuery("interval")) || undefined
        });
        this.fillTOC();
        this.addEventHandlers();
        api.emit("listPersons");
    },

    fillTOC() {
        let {list, toc} = this.elements;
        toc.innerHTML = [...list.querySelectorAll(".pers-about > h2")]
            .map((header, index) => `<li data-idx="${index}">${header.innerHTML}</li>`)
            .join("");
    },

    addEventHandlers() {
        let {list, toc, tocBtn} = this.elements;
        if (utils.getQuery("autoPlay") !== "0") {
            list.addEventListener("mouseenter", slider.pause, false);
            list.addEventListener("mouseleave", slider.play, false);
        }
        tocBtn.addEventListener("click", this.tocBtnHandler.bind(this), false);
        toc.addEventListener("click", this.tocHandler.bind(this), false);
    },

    tocBtnHandler() {
        slider.pause();
        this.elements.toc.classList.add("toc-show");
    },

    tocHandler({target}) {
        let index = target.getAttribute("data-idx");
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
        listPersons() {
            let persons = new Map();
            [...ui.elements.list.children].forEach(slide => {
                let personId = slide.getAttribute("data-pers");
                let personName = slide.querySelector(".pers-about > h2").textContent;
                persons.set(personId, personName);
            });
            if (window._babelPolyfill) {
                // IE fallback, as it doesn't support structured cloning of Maps
                return [...persons].reduce((o, [key, val]) => {o[key] = val; return o;}, {});
            }
            return persons;
        }
    },
    methods: {
        /**
         * Show the slide corresponding to the specified person
         * @param {String} pers - Person name as defined in the `data-pers` attributes
         */
        showSlide(pers) {
            let slides = [...ui.elements.list.children];
            let index = slides.findIndex(slide => slide.getAttribute("data-pers") === pers);
            if (index > -1) {
                slider.goto(index);
            }
        }
    }
});

ui.init();

module.exports = {};