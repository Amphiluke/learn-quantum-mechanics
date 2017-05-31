(function () {
    "use strict";

    let dom = {
        id(id) {
            return document.getElementById(id);
        },

        qs(el, selector) {
            return el.querySelector(selector);
        },

        qsa(el, selector) {
            return el.querySelectorAll(selector);
        }
    };
    // Cache elements
    [...dom.qsa(document.body, "[id]")].forEach(el => {
        let key = el.id.replace(/-\w/g, match => match[1].toUpperCase());
        dom[key] = el;
    });
    dom.wDefs = new Map([...dom.qsa(dom.id("w-defaults"), "[data-widget]")].map(el => {
        return [el.dataset.widget, el];
    }));

    const repoURL = "https://github.com/Amphiluke/learn-quantum-mechanics/tree/master/src";
    const rootPath = location.origin + location.pathname.replace(/\/(?:index\.html)?$/, "");
    const wConfig = {
        IPW: {
            docs: `${repoURL}/infinite-potential-well#infinite-potential-well`,
            get url() {
                return wConfig._getPath("infinite-potential-well") + wConfig._getQuery("IPW");
            },
            width: 430,
            height: 365
        },
        QHO: {
            docs: `${repoURL}/harmonic-oscillator#quantum-harmonic-oscillator`,
            get url() {
                return wConfig._getPath("harmonic-oscillator") + wConfig._getQuery("QHO");
            },
            width: 430,
            height: 365
        },
        HA: {
            docs: `${repoURL}/hydrogen-atom#hydrogen-atom`,
            get url() {
                return wConfig._getPath("hydrogen-atom") + wConfig._getQuery("HA");
            },
            width: 430,
            height: 365
        },
        PQM: {
            docs: `${repoURL}/personalities#personalities`,
            get url() {
                return wConfig._getPath("personalities") + wConfig._getQuery("PQM");
            },
            width: 200,
            height: 480
        }
    };
    Object.defineProperties(wConfig, {
        current: {
            configurable: true,
            get() {
                return dom.wType.value;
            }
        },
        _getPath: {
            configurable: true,
            value(subPath) {
                let mode = dom.wLegacy.checked ? "lb" : "mb";
                let lang = dom.wLang.value;
                return `${rootPath}/${mode}/${subPath}/${lang}.html`;
            }
        },
        _getQuery: {
            configurable: true,
            value(type) {
                let paramElems = dom.qsa(dom.wForm, `[data-widget="${type}"] [data-param]`);
                let params = new Map();
                for (let el of paramElems) {
                    let param = el.getAttribute("data-param");
                    let value = el.value;
                    if (el.type === "checkbox") {
                        if (!el.hasAttribute("value")) {
                            value = Number(el.checked);
                        } else if (!el.checked) {
                            continue;
                        }
                    }
                    if (params.has(param)) {
                        params.set(param, `${params.get(param)},${value}`);
                    } else {
                        params.set(param, `${value}`);
                    }
                }
                let query = [...params].map(([param, value]) => {
                    return encodeURIComponent(param) + "=" + encodeURIComponent(value);
                }).join("&");
                return query ? `?${query}` : "";
            }
        }
    });

    let wPreview = {
        refresh(asap = false) {
            if (this.refreshTimer) {
                if (asap) {
                    clearTimeout(this.refreshTimer);
                } else {
                    return;
                }
            }
            this.refreshTimer = setTimeout(() => {
                this.refreshTimer = null;
                let frame = dom.wFrame;
                ({width: frame.width, height: frame.height, url: frame.src} = wConfig[wConfig.current]);
            }, asap ? 0 : 750);
        }
    };

    let wCtrl = {
        init() {
            let {wLegacy, wFrame} = dom;
            wLegacy.checked = wLegacy.defaultChecked = !wFrame.contentWindow.Promise;
            this.addEventListeners();
            this.updateResult();
        },

        addEventListeners() {
            let {wType, wForm, wCode, haPrincipal} = dom;
            wType.addEventListener("change", this.wTypeChange.bind(this), false);
            haPrincipal.addEventListener("change", this.haPrincipalChange.bind(this), false);
            wForm.addEventListener("change", this.paramChange.bind(this), false);
            wForm.addEventListener("submit", this.formSubmit.bind(this), false);
            wCode.addEventListener("focus", () => wCode.select(), false);
        },

        wTypeChange() {
            let {wType, wDocs, wDefs, wForm} = dom;
            let type = wType.value;
            wDocs.href = wConfig[type].docs;
            wDefs.forEach((el, id) => el.classList[id === type ? "add" : "remove"]("active"));
            wForm.reset();
            wType.value = type;
            this.updateResult();
        },

        haPrincipalChange() {
            let {haPrincipal, haAzimuthal} = dom;
            haAzimuthal.max = haPrincipal.value - 1;
            haAzimuthal.value = Math.min(haAzimuthal.value, haAzimuthal.max);
        },

        paramChange({target: el}) {
            if (el.getAttribute("data-param") || el === dom.wLang || el === dom.wLegacy) {
                this.updateResult();
            }
        },

        formSubmit(e) {
            e.preventDefault();
            this.updateResult();
        },

        updateResult() {
            wPreview.refresh();
            let {wType, wCode} = dom;
            const {width, height, url} = wConfig[wType.value];
            wCode.value = `<iframe src="${url}" width="${width}" height="${height}" scrolling="no" frameborder="0"></iframe>`;
        }
    };

    wCtrl.init();
})();