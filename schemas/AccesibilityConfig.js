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
        min: 10,
        max: 50,
        default: 25
    },
    visualDisease: {
        type: String,
        required: true
    }
});

module.exports = AccesibilityConfigSchema;