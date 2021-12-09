const { Schema, model } = require("mongoose");

const positions = ["left", "right"];

const ClinicSectionSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        maxLength: 500,
        required: [true, "Description is required"]
    },
    img: {
        type: String,
        required: [true, "Img is required"]
    },
    imgPosition: {
        type: String,
        enum: positions,
        required: [true, "Position is required"]
    }
});

module.exports = ClinicSectionSchema;