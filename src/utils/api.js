"use strict";

let parentWnd = window.parent;

let api = {
    init({widget, messageData = {}, methods = {}} = {}) {
        this.widget = widget;
        Object.assign(this.messageData, messageData);
        Object.assign(this.methods, methods);
    },

    messageData: {},

    emit(message, ...data) {
        if (this.messageData.hasOwnProperty(message)) {
            let messageData = this.messageData[message](...data);
            if (messageData !== undefined) {
                parentWnd.postMessage({widget: this.widget, event: message, data: messageData}, "*");
            }
        }
    },

    methods: {},

    invoke(method, args = []) {
        if (this.methods.hasOwnProperty(method)) {
            this.methods[method](...args);
        }
    }
};

window.addEventListener("message", ({data, source}) => {
    if (source === parentWnd) {
        api.invoke(data.method, data.args);
    }
}, false);

module.exports = api;