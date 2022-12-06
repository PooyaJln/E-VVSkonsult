const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator')
// const connection = require('../connections/dbConnection')
// const connection = require('../connections/dbConnections')

const userSchema = new Schema({
    // Name: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function (email, password) {

    //validation
    if (!email || !password) {
        throw Error('All fields mut be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('email is not valid')
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 0, minSymbols: 0 })) {
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({ email }).exec();
    if (exists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = await this.create({ email, password: hash })
    return newUser
}

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields mut be filled')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }
    const pswdMatches = await bcrypt.compare(password, user.password);
    if (!pswdMatches) {
        throw Error('Incorrect password')
    }
    return user
}
const userModel = mongoose.model('User', userSchema)
// const userModel = connection.model('User', userSchema)
// const userModel = connection.usersDbConnection.model('User', userSchema)
module.exports = userModel
// module.exports = userSchema