require("dotenv").config();
const jwt = require("jsonwebtoken");
const Errors = require("../utils/errors");

const userDbServices = require("../services/userDbServices");
const roleDbServices = require("../services/roleDbServices");
const userServices = require("../services/userServices");

var maxAgeToken = 2 * 60 * 1000;
var maxAgeCookie = 2 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAgeToken,
  });
};

const userControllers = {};



userControllers.getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json({ message: "get All users" });
  } catch (error) {
    next(error);
  }
};

userControllers.getUser = async (req, res, next) => {
  try {
    const user_id = req.session?.passport?.user
    const foundUser = await userDbServices.findItemByID(user_id)
    res.status(200).json({ foundUser });
  } catch (error) {
    next(error);
  }
};

userControllers.updateUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "update user" });
  } catch (error) {
    next(error);
  }
};

userControllers.deleteUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "delete user" });
  } catch (error) {
    next(error);
  }
};


module.exports = userControllers;
// //---------------------------------------MySql-------------------------------------------
// //------------------------ logic functions
// const idCheckSql = async (id) => {
//   try {
//     const [foundId] = await poolPromise.query(
//       `
//                                         SELECT user_id
//                                         FROM users
//                                         WHERE user_id = ?;
//                                         `,
//       [id]
//     );
//     if (!foundId.length) {
//       return false;
//     } else return true;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getUserSql = async (id) => {
//   try {
//     const [row] = await poolPromise.query(
//       `
//                                     SELECT *
//                                     FROM users
//                                     WHERE user_id = ?
//                                     `,
//       [id]
//     );
//     return row[0];
//   } catch (error) {
//     console.error(error);
//   }
// };

// const allUsersSql = async () => {
//   try {
//     const [rows] = await poolPromise.query(`SELECT * FROM users`);
//     if (!rows.length) {
//       throw Error("seems like the database is empty");
//     }
//     return rows;
//   } catch (error) {
//     console.error(error);
//   }
// };
// const generateHash = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   const hashed = await bcrypt.hash(password, salt);
//   return hashed;
// };
// const generatecookieHash = async (id) => {
//   const salt = await bcrypt.genSalt(10);
//   const hashedId = await bcrypt.hash(id, salt);
//   return hashedId;
// };

// const signUpValidate = async (name, email, password) => {
//   //validation
//   if (!name || !email || !password) {
//     throw Error("name, email and password must be filled");
//   }
//   if (!validator.isEmail(email)) {
//     throw Error("email is not valid");
//   }
//   if (
//     !validator.isStrongPassword(password, {
//       minLength: 8,
//       minLowercase: 1,
//       minUppercase: 0,
//       minSymbols: 0,
//     })
//   ) {
//     throw Error("Password is not strong enough");
//   }
//   if (validator.isEmail(email)) {
//     const [exists] = await poolPromise.query(
//       `
//                                         SELECT user_id
//                                         FROM users
//                                         WHERE user_email = ?
//                                         `,
//       [email]
//     );
//     console.log(exists);
//     if (exists.length) {
//       throw Error("Email already in use");
//     }
//   }
//   return await generateHash(password);
// };

// const loginValidate = async (email, password) => {
//   if (!email || !password) {
//     throw Error("All fields mut be filled");
//   }
//   const [id] = await poolPromise.query(
//     `
//                                             SELECT user_id
//                                             FROM users
//                                             WHERE user_email = ?
//                                         `,
//     [email]
//   );
//   const user_id = id[0].user_id;
//   // console.log(user_id)
//   if (!user_id) {
//     throw Error("Incorrect email");
//   }
//   const [hashedPass] = await poolPromise.query(
//     `
//                                                 SELECT hashed_pass
//                                                 FROM hashedPasses
//                                                 WHERE user_id = ?
//                                             `,
//     [user_id]
//   );
//   // console.log("hashedPass: ", hashedPass)
//   // console.log("hashedPass[0]: ", hashedPass[0])
//   // console.log("hashedPass[0].hashed_pass: ", hashedPass[0].hashed_pass)
//   const pswdMatches = await bcrypt.compare(password, hashedPass[0].hashed_pass);
//   if (!pswdMatches) {
//     throw Error("Incorrect password");
//   }
//   return user_id;
// };
// //---------------------------------- MySQL CRUD functions---------------------------

// // create new user
// const signupUserSql = async (req, res) => {
//   const { user_name, user_email, Password, user_role } = req.body;
//   console.log(user_name, user_email, user_role);

//   try {
//     const hashed = await signUpValidate(user_name, user_email, Password);
//     const [newUser] = await poolPromise.query(
//       `
//                                                 INSERT INTO users
//                                                 (user_name, user_email, user_role)
//                                                 VALUES (?, ?, ?)
//                                                 `,
//       [user_name, user_email, user_role]
//     );
//     const id = newUser.insertId;
//     console.log(id);
//     const result = await getUserSql(id);
//     console.log(result);
//     await poolPromise.query(
//       `
//                                 INSERT INTO hashedPasses
//                                 (user_id, hashed_pass)
//                                 VALUES (?,?)
//                                 `,
//       [id, hashed]
//     );

//     res.status(201).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// //get a single user
// const getSingleUserSql = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (await idCheckSql(id)) {
//       const user = await getUserSql(id);
//       res.status(200).json(user);
//     } else {
//       return res.status(404).json({ error: "User was not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };
// // update a user

// // get all users
// const getAllUsersSql = async (req, res) => {
//   try {
//     const allUsers = await allUsersSql();
//     res.status(200).json(allUsers);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// //user Login
// const handleLoginSql = async (req, res) => {
//   const { user_email, Password } = req.body;
//   try {
//     const user_id = await loginValidate(user_email, Password);
//     console.log(user_id);
//     const token = createToken(user_id);
//     console.log("token: ", token);
//     // await poolPromise.query(`
//     //                         INSERT INTO accessTokens
//     //                         (user_id, accessToken, createdAt)
//     //                         VALUES (?,?,?)
//     //                         `, [user_id, token, new Date()]);
//     // const [accessTokenResults] = await poolPromise.query(`
//     //                                                     SELECT accessToken
//     //                                                     from accessTokens
//     //                                                     WHERE user_id = ?
//     //                                                 `, [user_id]);
//     // console.log(accessTokenResults[0])
//     // const cookieName = `jwt-${generatecookieHash(user_id)}`
//     res.cookie("jwt", token, {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge: maxAgeCookie,
//     }); // // dont forget to change it to sameSite: 'None', secure: true, under production
//     // res.cookie(cookieName, token, { httpOnly: true, sameSite: 'None', maxAge: maxAgeCookie }) // // dont forget to change it to sameSite: 'None', secure: true, under production
//     res.status(200).json(`user with id ${user_id} is logged in`);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// };
// //delete a single user
// const deleteUserSql = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (await idCheckSql(id)) {
//       await poolPromise.query(
//         `
//                             DELETE FROM users
//                             WHERE user_id = ?
//                         `,
//         [id]
//       );
//       res.status(200).json(`User with id ${id} is deleted`);
//     } else {
//       res.status(404).json({ error: "User was not found" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleLogOutSql = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) res.status(403).json("no token found"); // the access token already doesn't exist in the cookie.
//   const accessToken = cookies.jwt;
//   // const [accessTokenResults] = await poolPromise.query(`
//   //                                                         SELECT accessToken
//   //                                                         from accessTokens
//   //                                                         WHERE accessToken = ?
//   //                                                     `, [accessToken]);
//   // const token = accessTokenResults[0].accessToken;
//   // const id = accessTokenResults[0].user_id;
//   if (accessToken) {
//     // delete access token from databse
//     res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); // we clear the cookie with the same condition we created it
//     // await poolPromise.query(`
//     //                         DELETE
//     //                         from accessTokens
//     //                         WHERE accessToken = ?
//     //                     `, [accessToken]);
//     res.cookie("jwt", "", { maxAge: 1 }); // // dont forget to change it to sameSite: 'None', secure: true, under production
//     res.status(200).json(`User with id ${id} logged out`);
//   }
// };

// //---------------------------------------MongoDB CRUD functions-----------------------------------
// // get all users
// const getAllUsers = async (req, res) => {
//   const allUsers = await users.find({}).sort("email asc");
//   res.status(200).json(allUsers);
// };

// // create new user
// const signupUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await users.signup(email, password);
//     // create token
//     const accessToken = createToken(user._id);
//     await accessTokenCollection.create({ userId: user._id, accessToken });
//     res.cookie("jwt", accessToken, {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge,
//     }); // // dont forget to change it to sameSite: 'None', secure: true, under production
//     res.status(200).json({ "user id": user._id, accessToken });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// //user Login
// const handleLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await users.login(email, password);
//     // create token
//     const accessToken = createToken(user._id);
//     const tokenDoc = await accessTokenCollection.create({
//       userId: user._id,
//       accessToken: accessToken,
//     });
//     console.log(accessToken);
//     res.cookie("jwt", accessToken, {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge: maxAge,
//     }); // // dont forget to change it to sameSite: 'None', secure: true, under production
//     res.status(200).json({ "user id was created with id: ": user._id });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// const handleLogOut = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); // the access token already doesn't exist in the cookie.

//   const accessToken = cookies.jwt;
//   const tokenDoc = await accessTokenCollection.findOne({
//     accessToken: accessToken,
//   });
//   if (tokenDoc) {
//     // delete access token from databse
//     res.clearCookie("jwt", {
//       httpOnly: true,
//       sameSite: "None",
//       maxAge: maxAge,
//     }); // we clear the cookie with the same condition we created it
//     await accessTokenCollection.findOneAndDelete({ accessToken });
//     res.cookie("jwt", "", { maxAge: 1 }); // // dont forget to change it to sameSite: 'None', secure: true, under production
//     res.status(200).json({ message: "You logged out successfully" });
//   }
// };

// // update an user
// const userUpdate = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id)) {
//     res.status(404).json({ error: "This user doesn't exist" });
//   }
//   const user = await users.findByIdAndUpdate(id, req.body, { new: true }); // check for error
//   if (!user) {
//     return res.status(404).json({ error: "No such user to update" });
//   }
//   res.status(200).json(user);
// };

// //get a single user
// const getSingleUser = async (req, res) => {
//   // const id = req.param.id;
//   const { id } = req.params;
//   // we need to validate type of the id
//   if (!mongoose.isValidObjectId(id)) {
//     // if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such single user" });
//   }
//   const user = await users.findById(id);
//   if (!user) {
//     return res.status(404).json({ error: "No such single user to fetch" });
//   }
//   res.status(200).json(user);
// };

// //delete a single user
// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.isValidObjectId(id)) {
//     res.status(404).json({ error: "User was not found" });
//   }
//   const user = await users.findByIdAndDelete(id);
//   if (!user) {
//     return res.status(404).json({ error: "No such user to delete" });
//   }
//   res.status(200).json(user);
// };

// module.exports = {
//   getAllUsers,
//   getAllUsersSql,
//   signupUser,
//   signupUserSql,
//   userUpdate,
//   // userUpdateSql,
//   getSingleUser,
//   getSingleUserSql,
//   deleteUser,
//   deleteUserSql,
//   handleLogin,
//   handleLoginSql,
//   // handleRefreshToken,
//   handleLogOut,
//   handleLogOutSql,
// };
