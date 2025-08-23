"use strict";
// const { sequelize } = require("../connections/dbConnection");
const { Sequelize, DataTypes } = require("sequelize");

const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING,
        isEmail: true,
        required: true,
        notNull: true,
        notEmpty: true,
        allowNull: false,
        unique: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
        // set(value) {
        //   if (value) {
        //     this.setDataValue('user_name', value);
        //   }
        //   else {
        //     this.setDataValue('user_name', this.user_email.split("@")[0]);
        //   }
        // },
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: true
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: false,
    }
  )

  UserModel.beforeCreate((user) => {
    if (!user.user_name && user.user_email) {
      user.user_name = user.user_email.split("@")[0];
    }
  });
  return UserModel;
};

module.exports = User;

//////////////////// MOngoDB

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const validator = require('validator')

// const userSchema = new Schema({
//     // Name: {
//     //     type: String,
//     //     required: true,
//     //     unique: true
//     // },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

// userSchema.statics.signup = async function (email, password) {

//     //validation
//     if (!email || !password) {
//         throw Error('All fields mut be filled')
//     }
//     if (!validator.isEmail(email)) {
//         throw Error('email is not valid')
//     }
//     if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 0, minSymbols: 0 })) {
//         throw Error('Password is not strong enough')
//     }
//     const exists = await this.findOne({ email }).exec();
//     if (exists) {
//         throw Error('Email already in use')
//     }
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)
//     const newUser = await this.create({ email, password: hash })
//     return newUser
// }

// userSchema.statics.login = async function (email, password) {

//     if (!email || !password) {
//         throw Error('All fields mut be filled')
//     }
//     const user = await this.findOne({ email })
//     if (!user) {
//         throw Error('Incorrect email')
//     }
//     const pswdMatches = await bcrypt.compare(password, user.password);
//     if (!pswdMatches) {
//         throw Error('Incorrect password')
//     }
//     return user
// }
// const userModel = mongoose.model('User', userSchema)
// const userModel = connection.model('User', userSchema)
// const userModel = connection.usersDbConnection.model('User', userSchema)
// module.exports = userModel
// module.exports = userSchema
