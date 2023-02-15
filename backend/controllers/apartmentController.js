const Errors = require("../utils/errors");
const apartmentDbServices = require("../services/apartmentDbServices");
const apartmentServices = require("../services/apartmentServices");

//----------------------------------------------------------------
const apartmentControllers = {};

// create new projects
apartmentControllers.createItem = async (req, res, next) => {
  try {
    const preCreateCheck = await apartmentServices.preCreateCheck(req.body);
    if (preCreateCheck) {
      const newApartment = await apartmentDbServices.createItem(req.body);
      res.status(201).json(newApartment);
    }
  } catch (error) {
    next(error);
  }
};

//get a single project
apartmentControllers.getItemInfo = async (req, res, next) => {
  try {
    let apartment = await apartmentDbServices.getItemAndchildren(
      req.params.apartment_id
    );
    res.status(200).json(apartment);
  } catch (error) {
    next(error);
  }
};

// update an project
apartmentControllers.updateItem = async (req, res, next) => {
  try {
    const id = req.params.apartment_id;
    const preUpdateCheck = await apartmentServices.preUpdateCheck(id, req.body);
    if (preUpdateCheck) {
      let updatedApartment = await apartmentDbServices.updateItem(
        req.params.apartment_id,
        req.body
      );
      return res.status(200).json(updatedApartment);
    }
  } catch (error) {
    next(error);
  }
};

//delete a single project
apartmentControllers.deleteItem = async (req, res, next) => {
  try {
    let message = await apartmentDbServices.deleteItem(req.params.apartment_id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = apartmentControllers;
