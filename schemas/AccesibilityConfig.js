const { Schema } = require('mongoose');

const allowedFontSizes = ['sm', 'md', 'base', 'lg', 'xl'];

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
        type: String,
        enum: allowedFontSizes,
        default: 'base'
    },
    visualDisease: {
        type: String,
        default: 'healthy-vision'
    }
});

module.exports = AccesibilityConfigSchema;