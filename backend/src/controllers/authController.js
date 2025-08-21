require("dotenv").config();
const Errors = require("../utils/errors");

const userDbServices = require("../services/userDbServices");
const roleDbServices = require("../services/roleDbServices");
const userServices = require("../services/userServices");

const authControllers = {};

authControllers.signUp = async (req, res, next) => {
  try {
    const role = await roleDbServices.findRoleByTitle(req.body.user_role.toLowerCase())
    if (role) {
      const hashedPassword = await userServices.generateHash(req.body.password);
      const newUser = await userDbServices.createItem({
        ...req.body,
        role_id: role.role_id,
        password: hashedPassword,
      });
      req.login(newUser, (err) => {
        if (err) { return next(err); }
        console.log("🚀 ~ authController.js:25 ~ signUp.req.login ~ user=", newUser)
        // res.status(201).json({ message: " logged out successfully" })
        res.redirect(201, "../../user/profile")
      })
      // res.status(201).json({ message: "signup successful", })
    }
  } catch (error) {
    next(error);
  }
};


authControllers.login = async (req, res, next) => {
  res.status(200).json({ message: "login successfull" });

};

authControllers.logout = (req, res, next) => {
  try {
    if (!req.user)
      return res.sendStatus(401)
    if (req.user) {
      req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy()
        res.clearCookie('connect.sid')
        res.status(200).json({ message: " logged out successfully" })
      })
    }
  } catch (error) {
    next(error);
  }
};


authControllers.checkStatus = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json("not authorized")
  }
  res.status(200).json("logged in")
}

module.exports = authControllers;