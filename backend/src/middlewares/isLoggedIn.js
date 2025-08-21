const passport = require("./passportStrategies/LocalStrategy")
const express = require("express")

const isLoggedIn = async (req, res, next) => {

    console.log("🚀 ~ isLoggedIn.js:5 ~ isLoggedIn ~ req.user=", req.user ? req.user : null)
    console.log("🚀 ~ isLoggedIn.js:5 ~ isLoggedIn ~ req.user.user_id=", req.user ? req.user.user_id : null)
    console.log("🚀 ~ isLoggedIn.js:5 ~ isLoggedIn ~ req.session=", req.session)
    console.log("🚀 ~ isLoggedIn.js:5 ~ isLoggedIn ~ req.isAuthenticated()=", req.isAuthenticated())
    console.log("🚀 ~ isLoggedIn.js:5 ~ isLoggedIn ~ req.session.passport.user=", req.session?.passport?.user ?? null)
    if (!req.isAuthenticated() || !req.user || !req.session.passport.user) {
        return res.status(401).json({ message: "not logged in" })
    }
    next()
}

module.exports = isLoggedIn