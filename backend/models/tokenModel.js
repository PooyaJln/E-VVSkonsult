const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accessTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    accessToken: {
        type: String,
        required: false
    },
    expiresIn: {
        type: Date,
        required: false
    }
}, { timestamps: true })


module.exports = accessTokenSchema;