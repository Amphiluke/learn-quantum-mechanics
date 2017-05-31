"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
    "use strict";

    var dom = {
        id: function id(_id) {
            return document.getElementById(_id);
        },
        qs: function qs(el, selector) {
            return el.querySelector(selector);
        },
        qsa: function qsa(el, selector) {
            return el.querySelectorAll(selector);
        }
    };
    // Cache elements
    [].concat(_toConsumableArray(dom.qsa(document.body, "[id]"))).forEach(function (el) {
        var key = el.id.replace(/-\w/g, function (match) {
            return match[1].toUpperCase();
        });
        dom[key] = el;
    });
    dom.wDefs = new Map([].concat(_toConsumableArray(dom.qsa(dom.id("w-defaults"), "[data-widget]"))).map(function (el) {
        return [el.dataset.widget, el];
    }));

    var repoURL = "https://github.com/Amphiluke/learn-quantum-mechanics/tree/master/src";
    var rootPath = location.origin + location.pathname.replace(/\/(?:index\.html)?$/, "");
    var wConfig = {
        IPW: {
            docs: repoURL + "/infinite-potential-well#infinite-potential-well",
            get url() {
                return wConfig._getPath("infinite-potential-well") + wConfig._getQuery("IPW");
            },
            width: 430,
            height: 365
        },
        QHO: {
            docs: repoURL + "/harmonic-oscillator#quantum-harmonic-oscillator",
            get url() {
                return wConfig._getPath("harmonic-oscillator") + wConfig._getQuery("QHO");
            },
            width: 430,
            height: 365
        },
        HA: {
            docs: repoURL + "/hydrogen-atom#hydrogen-atom",
            get url() {
                return wConfig._getPath("hydrogen-atom") + wConfig._getQuery("HA");
            },
            width: 430,
            height: 365
        },
        PQM: {
            docs: repoURL + "/personalities#personalities",
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
            get: function get() {
                return dom.wType.value;
            }
        },
        _getPath: {
            configurable: true,
            value: function value(subPath) {
                var mode = dom.wLegacy.checked ? "lb" : "mb";
                var lang = dom.wLang.value;
                return rootPath + "/" + mode + "/" + subPath + "/" + lang + ".html";
            }
        },
        _getQuery: {
            configurable: true,
            value: function value(type) {
                var paramElems = dom.qsa(dom.wForm, "[data-widget=\"" + type + "\"] [data-param]");
                var params = new Map();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = paramElems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var el = _step.value;

                        var param = el.getAttribute("data-param");
                        var value = el.value;
                        if (el.type === "checkbox") {
                            if (!el.hasAttribute("value")) {
                                value = Number(el.checked);
                            } else if (!el.checked) {
                                continue;
                            }
                        }
                        if (params.has(param)) {
                            params.set(param, params.get(param) + "," + value);
                        } else {
                            params.set(param, "" + value);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var query = [].concat(_toConsumableArray(params)).map(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        param = _ref2[0],
                        value = _ref2[1];

                    return encodeURIComponent(param) + "=" + encodeURIComponent(value);
                }).join("&");
                return query ? "?" + query : "";
            }
        }
    });

    var wPreview = {
        refresh: function refresh() {
            var _this = this;

            var asap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.refreshTimer) {
                if (asap) {
                    clearTimeout(this.refreshTimer);
                } else {
                    return;
                }
            }
            this.refreshTimer = setTimeout(function () {
                _this.refreshTimer = null;
                var frame = dom.wFrame;
                var _wConfig$wConfig$curr = wConfig[wConfig.current];
                frame.width = _wConfig$wConfig$curr.width;
                frame.height = _wConfig$wConfig$curr.height;
                frame.src = _wConfig$wConfig$curr.url;
            }, asap ? 0 : 750);
        }
    };

    var wCtrl = {
        init: function init() {
            var wLegacy = dom.wLegacy,
                wFrame = dom.wFrame;

            wLegacy.checked = wLegacy.defaultChecked = !wFrame.contentWindow.Promise;
            this.addEventListeners();
            this.updateResult();
        },
        addEventListeners: function addEventListeners() {
            var wType = dom.wType,
                wForm = dom.wForm,
                wCode = dom.wCode,
                haPrincipal = dom.haPrincipal;

            wType.addEventListener("change", this.wTypeChange.bind(this), false);
            haPrincipal.addEventListener("change", this.haPrincipalChange.bind(this), false);
            wForm.addEventListener("change", this.paramChange.bind(this), false);
            wForm.addEventListener("submit", this.formSubmit.bind(this), false);
            wCode.addEventListener("focus", function () {
                return wCode.select();
            }, false);
        },
        wTypeChange: function wTypeChange() {
            var wType = dom.wType,
                wDocs = dom.wDocs,
                wDefs = dom.wDefs,
                wForm = dom.wForm;

            var type = wType.value;
            wDocs.href = wConfig[type].docs;
            wDefs.forEach(function (el, id) {
                return el.classList[id === type ? "add" : "remove"]("active");
            });
            wForm.reset();
            wType.value = type;
            this.updateResult();
        },
        haPrincipalChange: function haPrincipalChange() {
            var haPrincipal = dom.haPrincipal,
                haAzimuthal = dom.haAzimuthal;

            haAzimuthal.max = haPrincipal.value - 1;
            haAzimuthal.value = Math.min(haAzimuthal.value, haAzimuthal.max);
        },
        paramChange: function paramChange(_ref3) {
            var el = _ref3.target;

            if (el.getAttribute("data-param") || el === dom.wLang || el === dom.wLegacy) {
                this.updateResult();
            }
        },
        formSubmit: function formSubmit(e) {
            e.preventDefault();
            this.updateResult();
        },
        updateResult: function updateResult() {
            wPreview.refresh();
            var wType = dom.wType,
                wCode = dom.wCode;
            var _wConfig$wType$value = wConfig[wType.value],
                width = _wConfig$wType$value.width,
                height = _wConfig$wType$value.height,
                url = _wConfig$wType$value.url;

            wCode.value = "<iframe src=\"" + url + "\" width=\"" + width + "\" height=\"" + height + "\" scrolling=\"no\" frameborder=\"0\"></iframe>";
        }
    };

    wCtrl.init();
})();

