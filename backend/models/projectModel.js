const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./userModel')

const projectSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false,
    },
    members: {
        type: [userSchema],
        required: false
    }
}, { timestamps: true })

// const projectModel = mongoose.model('project', projectSchema)
// module.exports = { projectModel, projectSchema };

module.exports = projectSchema;