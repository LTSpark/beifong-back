const { Schema } = require('mongoose');

const AccesibilityConfigSchema = Schema({
    darkMode: {
        type: Boolean,
        default: false
    },
    textToVoice: {
        type: Boolean,
        default: false
    },
    highContrast: {
        type: Boolean,
        default: false
    },
    highlightText: {
        type: Boolean,
        default: false
    },
    fontSize: {
        type: Number,
        min: 0,
        max: 100,
        default: 40
    }
});

module.exports = AccesibilityConfigSchema;