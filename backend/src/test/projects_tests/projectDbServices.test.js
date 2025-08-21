//import the functions that we want to test.
const projectDbServices = require("../../services/userServices/projectDbServices");

//import test database
const db = require("../../models");

// import test assertion components
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

describe("testing project database services", () => {
  describe("testing projectDbServices.projectNameExists", () => {
    it("should return false when project name doesn't exist ", async () => {
      const project_name = "John.Doe@sampleSite.com";
      const check = await projectDbServices.projectNameExists(project_name);
      expect(check).to.be.false;
      expect(check === undefined).to.be.false;
      expect(check === null).to.be.false;
    });

    it("should throw an error if the name is left empty", async () => {
      try {
        const project_name = "";
        const foundProject = await projectDbServices.projectNameExists(
          project_name
        );
      } catch (error) {
        expect(error).to.be.an("Error");
        expect(error.message).to.equal("project name can not be left empty");
      }
    });
  });

  describe("testing projectDbServices.createUser", () => {
    it("should create a user, see if email already exists and fail", async () => {
      const testUser = await db.user.create({
        user_id: 100,
        user_name: "test user name",
        user_email: "testEmail@example.com",
        user_role: "test user role",
      });
      const check = await projectDbServices.emailExists(
        "testEmail@example.com"
      );
      console.log(check.dataValues);
      expect(check).to.be.an("Object");
      await testUser.destroy({ force: true });
    });
  });
});
