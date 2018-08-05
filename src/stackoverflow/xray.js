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
        }
    };

    return new Xray(options);
};