const userDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.user = data
    }
}

require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

console.log('userDB:', userDB)
console.log('userDB.users:', userDB.users)
const foundUser = userDB.users[0]
console.log('foundUser: ', foundUser)
const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
console.log('otherUsers: ', otherUsers)

const accessToken = jwt.sign(
    { "username": foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
)
const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
);
const currentUser = { ...foundUser, refreshToken };
userDB.setUsers([...otherUsers, currentUser]);
console.log('currentUser: ', currentUser)
console.log('userDB:', userDB)

// const handleLogin = async (req, res) => {
//     const { password, email } = req.body;
//     if (!password || !email) {
//         return res.status(400).json({ 'message': 'username, password or email is required' })
//     }
//     const foundUser = await usersDbCollection.findOne({ 'email': email });
//     if (!foundUser) return res.status(401).json({ message: 'Unauthorized' }) // 401 Unauthorized
//     //evaluate password
//     const pswdMatches = await bcrypt.compare(password, foundUser.password);
//     if (pswdMatches) {
//         //create JWT
//         const accessToken = jwt.sign({ 'username': foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
//         const refreshToken = jwt.sign({ 'username': foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

//         // creating a list of other users

//         res.status(200).json({ 'success': `user ${foundUser.Name} is logged in` })
//     } else {
//         res.status(401).json({ message: 'Unauthorized' })
//     }
// }


// module.exports = { handleLogin }