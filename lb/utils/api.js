"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var parentWnd = window.parent;

var api = {
    init: function init() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            widget = _ref.widget,
            _ref$messageData = _ref.messageData,
            messageData = _ref$messageData === undefined ? {} : _ref$messageData,
            _ref$methods = _ref.methods,
            methods = _ref$methods === undefined ? {} : _ref$methods;

        this.widget = widget;
        Object.assign(this.messageData, messageData);
        Object.assign(this.methods, methods);
    },


    messageData: {},

    emit: function emit(message) {
        if (this.messageData.hasOwnProperty(message)) {
            var _messageData;

            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            var messageData = (_messageData = this.messageData)[message].apply(_messageData, data);
            if (messageData !== undefined) {
                parentWnd.postMessage({ widget: this.widget, event: message, data: messageData }, "*");
            }
        }
    },


    methods: {},

    invoke: function invoke(method) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (this.methods.hasOwnProperty(method)) {
            var _methods;

            (_methods = this.methods)[method].apply(_methods, _toConsumableArray(args));
        }
    }
};

window.addEventListener("message", function (_ref2) {
    var data = _ref2.data,
        source = _ref2.source;

    if (source === parentWnd) {
        api.invoke(data.method, data.args);
    }
}, false);

module.exports = api;