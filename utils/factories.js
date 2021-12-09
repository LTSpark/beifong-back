/*
    Factories.js: instantiate schemas to default or personalized models
*/

const { model } = require('mongoose');
const AccesibilityConfigSchema = require('../schemas/AccesibilityConfig');

const AccesibilityConfigDefaultFactory = () => {
    const AccesibilityConfig = model('AccesibilityConfig', AccesibilityConfigSchema);
    return new AccesibilityConfig({})
}

module.exports = {
    AccesibilityConfigDefaultFactory
}