const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const projectModel = mongoose.model('project', projectSchema)
// const project = connection.model('project', projectSchema)
// const project = connection.appDbConnection.model('project', projectSchema)
module.exports = projectModel

// module.exports = projectSchema;