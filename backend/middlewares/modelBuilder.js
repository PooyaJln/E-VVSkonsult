const modelBuilder = (connection, modelName, schema) => {
    return connection.model(modelName, schema)
}

module.exports = modelBuilder


// create the database and models
// const modelBuilder = require('./middlewares/modelBuilder')
// const connection = connToDatabase(projectname)
// const wallModel = modelBuilder(connection, 'wallModel', wallSchema)
// const roomModel = modelBuilder(connection, 'roomModel', roomSchema)
// const apartmentModel = modelBuilder(connection, 'apartmentModel', apartmentSchema)
// const envelopeModel = modelBuilder(connection, 'envelopeModel', envelopeSchema)
// const temperatureModel = modelBuilder(connection, 'temperatureModel', temperatureSchema)