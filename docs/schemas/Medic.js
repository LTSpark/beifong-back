module.exports = {
    SetMedicAccesibility: {
        type: "Object",
        properties: {
            darkMode: {
                type: "boolean",
                description: "Toogles the Dark Mode"
            },
            textToVoice: {
                type: "boolean",
                description: "Toogles the Text to Voice"
            },
            highlightText: {
                type: "boolean",
                description: "Toogles the Highlight text"
            },
            highContrast: {
                type: "boolean",
                description: "Toogles the High Contrast"
            },
            fontSize: {
                type: "string",
                description: "Select the font size ['sm', 'md', 'base', 'lg', 'xl']"
            },
            visualDisease: {
                type: "string",
                description: "Medic's visual disease"
            }
        },
        example: {
            darkMode: true,
            textToVoice: true,
            highlightText: true,
            highContrast: true,
            fontSize: "sm",
            visualDisease: "Achromatopsia"
        }
    },

    SetMedicAccesibilityResponse:{
        type: "Object",
        properties: {
            ok: {
                type: "boolean",
                description: "indicates if operation was done correctly"
            },
            msg: {
                type: "string",
                description: "information about operation perfomed"
            }
        },
        example: {
            ok: true,
            msg: "Accesibility config updated!" 
        }
    },

}