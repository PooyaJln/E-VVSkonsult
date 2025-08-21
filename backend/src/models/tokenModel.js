const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const connection = require('../connections/dbConnection')
// const connection = require('../connections/dbConnections')

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

const accessTokenModel = mongoose.model('accessToken', accessTokenSchema)
// const accessTokenModel = connection.model('accessToken', accessTokenSchema)
// const accessTokenModel = connection.usersDbConnection.model('accessToken', accessTokenSchema)
module.exports = accessTokenModel;