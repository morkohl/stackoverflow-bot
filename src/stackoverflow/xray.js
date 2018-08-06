const markupUtils = require('../../src/util/markuputil');
const Xray = require('x-ray');

module.exports = (options) => {
    options = options ? options : {};
    options.filters = {
        trim: function (value) {
            return typeof value === 'string' ? value.trim() : value
        },
        valueOf: function(value) {
            return typeof value === 'string' && /^-?\d*$/.exec(value) ? Number(value) : value
        },
        jsCode: function (value) {
            return typeof value === 'string' && value !== '' ? markupUtils.code.multiLineImplLanguage(value, 'js') : value
        },
        isAccepted: function (value) {
            return !!value;
        },
        valueOrNone: function (value) {
            return value && typeof value === 'string' ? Number(/\d+/.exec(value)) : 'unknown';
        },
        cutRef: function (value) {
            return /^[A-z]+:\/\/[A-z]+\.[A-z]+\/[A-z]+\/\d+\/[^=\/]+/.exec(value)[0];
        }
    };

    return new Xray(options);
};