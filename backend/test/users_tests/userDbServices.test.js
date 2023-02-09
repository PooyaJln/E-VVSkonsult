//import the functions that we want to test.
const userDbServices = require("../../services/userServices/userDbServices");

//import test database
const db = require("../../models/index");

// import test assertion components
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

describe("testing user database services", () => {
  describe("testing userDbServices.userEmailExists", () => {
    it("should return false when email doesn't exist ", async () => {
      const email = "John.Doe@sampleSite.com";
      const check = await userDbServices.emailExists(email);
      expect(check).to.be.false;
      expect(check === undefined).to.be.false;
      expect(check === null).to.be.false;
    });

    it("should throw an error if the email is left empty", async () => {
      try {
        const email = "";
        const foundUser = await userDbServices.emailExists(email);
      } catch (error) {
        expect(error).to.be.an("Error");
        expect(error.message).to.equal("email can not be left empty");
      }
    });
  });

  describe("testing userDbServices.createUser", () => {
    it("should create a user, see if email already exists and fail", async () => {
      const testUser = await db.user.create({
        user_id: 100,
        user_name: "test user name",
        user_email: "testEmail@example.com",
        user_role: "test user role",
      });
      const check = await userDbServices.emailExists("testEmail@example.com");
      console.log(check.dataValues);
      expect(check).to.be.an("Object");
      await testUser.destroy({ force: true });
    });
  });
});
