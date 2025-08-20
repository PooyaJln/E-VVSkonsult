const db = require("../models");
const Errors = require("../utils/errors");
const hashedPassDbServices = require("./hashedPassDbServices");

const roleDbServices = {};

roleDbServices.findItemByID = async (id) => {
  try {
    const item = await db.role.findOne({
      where: {
        role_id: id,
      },
    });
    if (item) {
      return item;
    }
    return null;
  } catch (error) {
    throw error;
  }
};


roleDbServices.findRoleByTitle = async (title) => {
  try {
    const foundRole = await db.role.findOne(
      {
        where:
          { role_title: title }
      }
    );
    if (foundRole) return foundRole;
    else return null;
  } catch (error) {
    throw error;
  }
}

// roleDbServices.itemsPublicInfo = async (id) => {
//   try {
//     const item = await db.role.findOne({
//       where: {
//         role_id: id,
//       },
//       attributes: ["user_email", "user_role"],
//     });
//     if (item) return item;
//     return false;
//   } catch (error) {
//     throw error;
//   }
// };

// roleDbServices.userExists = async (id) => {
//   try {
//     const user = await db.role.findOne(
//       {
//         where: {
//           role_id: id,
//         },
//         raw: true,
//       }
//     );

//     if (user) return user;
//     return false;
//   } catch (error) {
//     throw error;
//   }
// };

// roleDbServices.createItem = async (query) => {
//   try {
//     const { user_email, user_role, password } = query;
//     const newUser = await db.role.create({ user_email, user_role });
//     const userId = newUser.role_id;
//     await hashedPassDbServices.createItem(userId, password);
//     const user = await roleDbServices.itemsPublicInfo(userId);
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// roleDbServices.emailExists = async (email) => {
//   try {
//     const foundUser = await db.role.findOne(
//       {
//         where:
//           { user_email: email }
//       }
//     );
//     if (foundUser) return foundUser;
//     else return null;
//   } catch (error) {
//     throw error;
//   }
// }



module.exports = roleDbServices;
