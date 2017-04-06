"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = Object.freeze({
    AMU: 1.660539040E-27, // atomic mass unit, kg

    BOHR_RADIUS: 5.2917721067E-11, // Bohr radius, m

    PLANCK_CONSTANT: 1.054571800E-34, // Planck constant, J*s

    factorial: function factorial(n) {
        var result = 1;
        for (; n > 1; n--) {
            result *= n;
        }
        return result;
    },


    getQuery: function getQuery(param) {
        var queryMap = getQuery.queryMap;
        if (!queryMap) {
            queryMap = new Map();
            Object.defineProperty(getQuery, "queryMap", { value: queryMap }); // memoization
            var query = window.location.search.slice(1);
            if (query) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = query.split("&")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var keyVal = _step.value;

                        var pair = keyVal.split("=");
                        queryMap.set(decodeURIComponent(pair[0]), decodeURIComponent(pair[1] || ""));
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
            }
        }
        return param ? queryMap.get(param) : new Map([].concat(_toConsumableArray(queryMap)));
    }
});