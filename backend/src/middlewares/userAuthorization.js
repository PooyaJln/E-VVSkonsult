const userDbServices = require("../services/userDbServices")
const userAuthorization = {}

userAuthorization.engineerAuth = async (req, res, next) => {
    if (req.user.dataValue.user_role === 'engineer') next()
    else {
        res.sendStatus(401)

    }
}
userAuthorization.managerAuth = async (req, res, next) => {
    if (req.user.dataValue.user_role === 'manager') next()
    else {
        res.sendStatus(401)

    }
}
userAuthorization.adminAuth = async (req, res, next) => {

    if (req.user?.dataValue?.user_role === 'admin') next()
    else {
        res.sendStatus(401)

    }
}


module.exports = userAuthorization