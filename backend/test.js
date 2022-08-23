const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// define a schema
const animalSchema = new Schema(
    {
        name: String,
        type: String
    },
    {
        methods: {
            findSimilarTypes(cb) {
                return mongoose.model('Animal').find({ type: this.type }, cb);
            }
        }
    });

// Or, assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function (cb) {
    return mongoose.model('Animal').find({ type: this.type }, cb);
};