//@ts-check
const Errors = require("../utils/errors");
const db = require("../models");

const roomBoundaryDbServices = {};

roomBoundaryDbServices.createItem = async (query) => {
  try {
    let newBoundary = await db.roomBoundary.create(query);

    await setProperties.setBoundaryParentOpeningProp(newBoundary);
    newBoundary = await setProperties.setNetAreaAfterCreate(newBoundary);
    newBoundary = await setProperties.setInfiltHeatLosses(newBoundary);
    newBoundary = await setProperties.setTransAndTotalHeatLoss(newBoundary);

    return newBoundary;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDbServices.updateItem = async (id, query) => {
  try {
    await db.roomBoundary.update(query, {
      where: {
        boundary_id: id,
      },
    });

    const updatedItem = await roomBoundaryDbServices.itemsPublicInfo(id);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDbServices.deleteItem = async (id) => {
  try {
    let foundItem = await db.roomboundary.findByPk(id);
    if (!foundItem) {
      throw new Errors.badRequestError("no room boundary was found");
    }
    const roomBoundary_name = foundItem.boundary_name;
    const room = await db.room.findOne({
      where: {
        room_id: foundItem.room1_id,
      },
    });
    const room_name = room.room_name;

    await db.roomBoundary.destroy({
      where: {
        boundary_id: id,
      },
    });

    const message = `the room ${roomBoundary_name} in apartment ${room_name} is deleted`;
    return foundItem;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDbServices.itemsPublicInfo = async (id) => {
  try {
    let item = await db.roomBoundary.findOne({
      where: {
        boundary_id: id,
      },
    });
    item = await roomBoundaryDbServices.setProperties(item);

    let userReadableData = {};
    let userReadablePropertyArray = [
      "boundary_id",
      "boundary_name",
      "boundary_type",
      "parent_name",
      "area",
      "net_area",
      "uvalue",
      "inside_temp",
      "outside_temp",
      "infilt_heat_loss",
      "trans_heat_loss",
      "total_heat_loss",
    ];

    // if (item.boundary_type == "window" || item.boundary_type == "door") {
    //   userReadablePropertyArray = [
    //     "boundary_id",
    //     "boundary_name",
    //     "boundary_type",
    //     "area",
    //     "net_area",
    //     "uvalue",
    //     "inside_temp",
    //     "outside_temp",
    //     "infilt_heat_loss",
    //     "trans_heat_loss",
    //     "total_heat_loss",
    //     "parent_name",
    //   ];
    // } else {
    //   userReadablePropertyArray = [
    //     "boundary_id",
    //     "boundary_name",
    //     "boundary_type",
    //     "area",
    //     "opening_area",
    //     "net_area",
    //     "uvalue",
    //     "inside_temp",
    //     "outside_temp",
    //     "trans_heat_loss",
    //     "total_heat_loss",
    //   ];
    // }
    userReadablePropertyArray.forEach((key) => {
      userReadableData[key] = item.dataValues[key];
    });

    if (item) return userReadableData;
    return false;
  } catch (error) {
    throw error;
  }
};

//------------------------------------------------
roomBoundaryDbServices.setProperties = async (obj) => {
  try {
    // let item = await db.roomBoundary.findByPk(id);

    let item = await setProperties.setParentName(obj);
    item = await setProperties.setNetArea(item);
    item = await setProperties.setInfiltHeatLosses(item);
    item = await setProperties.setTransAndTotalHeatLoss(item);
    return item;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDbServices.itemNameExists = async (_name, id) => {
  try {
    const item = await db.room.findOne({
      where: {
        room_name: _name,
        apartment_id: id,
      },
    });
    if (item) return item;
    return false;
  } catch (error) {
    throw error;
  }
};

roomBoundaryDbServices.getItemsHeatLoss = async (obj) => {
  try {
    let item = obj;
    item = await roomBoundaryDbServices.setProperties(item);
    if (item) return item.dataValues["total_heat_loss"];

    // let userReadableData = {};
    // let userReadablePropertyArray = ["total_heat_loss"];
    // userReadablePropertyArray.forEach((key) => {
    //   userReadableData[key] = item.dataValues[key];
    // });
    // if (item) return userReadableData;
    return 0;
  } catch (error) {
    throw error;
  }
};

//------------------- setting virtual fields

const setProperties = {};
setProperties.setParentName = async (obj) => {
  try {
    const roomBoundary = obj;
    if (
      roomBoundary.boundary_type == "window" ||
      roomBoundary.boundary_type == "door"
    ) {
      const parent = await db.roomBoundary.findByPk(obj.boundary_parent_id);
      await roomBoundary.setDataValue("parent_name", parent.boundary_name);
      await roomBoundary.save();
    }
    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

setProperties.setBoundaryParentOpeningProp = async (obj) => {
  try {
    const roomBoundary = obj;
    if (
      roomBoundary.boundary_type == "window" ||
      roomBoundary.boundary_type == "door"
    ) {
      const parent = await db.roomBoundary.findByPk(obj.boundary_parent_id);

      if (!parent?.has_openings) {
        parent.has_openings = true;
        await parent.save();
      }
    } else {
      roomBoundary.boundary_parent_id = null;
      await roomBoundary.save();
    }
  } catch (error) {
    throw error;
  }
};

setProperties.setGroundConnected = async (obj, value) => {
  try {
    const roomBoundary = obj;
    if (roomBoundary.has_openings) {
      roomBoundary.groundConnected = false;
    }
    if (!roomBoundary.has_openings) {
      roomBoundary.groundConnected = value;
    }
    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

setProperties.setNetAreaAfterCreate = async (obj) => {
  try {
    const roomBoundary = obj;
    if (!roomBoundary.has_openings) {
      await roomBoundary.setDataValue("opening_area", 0);
      await roomBoundary.setDataValue("net_area", Number(roomBoundary.area));
    }

    await roomBoundary.save();
    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

setProperties.setNetArea = async (obj) => {
  try {
    const roomBoundary = obj;
    if (!roomBoundary.has_openings) {
      roomBoundary.opening_area = 0;
      roomBoundary.net_area = Number(obj.area);
    }
    if (roomBoundary.has_openings) {
      const openings = await db.roomBoundary.findAll({
        where: {
          boundary_parent_id: obj.boundary_id,
        },
      });
      let totalOpeningsArea = 0;
      openings.map((opening) => {
        totalOpeningsArea += Number(opening.area);
      });
      roomBoundary.opening_area = Number(totalOpeningsArea.toFixed(1));
      roomBoundary.net_area = Number(
        (roomBoundary.area - totalOpeningsArea).toFixed(1)
      );
    }

    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

setProperties.setInfiltHeatLosses = async (obj) => {
  try {
    const roomBoundary = obj;
    // setting infiltration heat losses for walls, roofs and floors
    if (
      roomBoundary.boundary_type == "wall" ||
      roomBoundary.boundary_type == "roof" ||
      roomBoundary.boundary_type == "floor"
    ) {
      roomBoundary.infilt_heat_loss = 0;
      // await roomBoundary.setDataValue("infilt_heat_loss", 0);
    }
    // setting infiltration heat losses for windows and doors

    if (
      roomBoundary.boundary_type == "door" ||
      roomBoundary.boundary_type == "window"
    ) {
      const inside_temperature = await calculations.getInsideTemperature(
        roomBoundary
      );
      roomBoundary.inside_temp = inside_temperature;
      const outside_temperature = await calculations.getOutSideTemperature(
        roomBoundary
      );
      roomBoundary.outside_temp = outside_temperature;
      const netArea = roomBoundary.net_area;
      const uValueId = roomBoundary.uvalue_id;
      const component = await db.component.findByPk(uValueId);
      const qInfId = component.component_qinf;
      const qInfParameter = await db.thermalParameter.findByPk(qInfId);
      const qInfValue = qInfParameter.parameter_value;
      let airDensityRow = await db.thermalParameter.findOne({
        where: {
          parameter_name: "air density" || "luft densitet",
        },
      });
      let airDensity = airDensityRow.parameter_value;
      let specificHeatCapacityRow = await db.thermalParameter.findOne({
        where: {
          parameter_name: "specific heat capacity" || "Specifik värmekapacitet",
        },
      });
      let specificHeatCapacity = specificHeatCapacityRow.parameter_value;
      const infHeatLoss =
        (qInfValue / 1000) *
        airDensity *
        specificHeatCapacity *
        netArea *
        (inside_temperature - outside_temperature);
      roomBoundary.infilt_heat_loss = Number(infHeatLoss.toFixed(1));
      // await roomBoundary.setDataValue("infilt_heat_loss", infHeatLoss);
    }
    await roomBoundary.save();
    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

setProperties.setTransAndTotalHeatLoss = async (obj) => {
  try {
    const roomBoundary = obj;

    // getting thermal bridge parameter
    const thermalBridgeRow = await db.thermalParameter.findOne({
      where: {
        // parameter_name: "thermal_bridge_coeff" || "thermal bridge coeff",
        parameter_name: "thermal bridge coeff",
      },
    });
    const thermal_bridge_coeff = Number(thermalBridgeRow.parameter_value);
    const uValue = await calculations.getUvalue(roomBoundary);
    roomBoundary.uvalue = uValue;
    const inside_temperature = await calculations.getInsideTemperature(
      roomBoundary
    );
    roomBoundary.inside_temp = inside_temperature;
    const outside_temperature = await calculations.getOutSideTemperature(
      roomBoundary
    );
    roomBoundary.outside_temp = outside_temperature;

    const netArea = roomBoundary.net_area;
    const trans_heat_loss =
      thermal_bridge_coeff *
      uValue *
      netArea *
      (inside_temperature - outside_temperature);
    if (trans_heat_loss < 0) {
      roomBoundary.trans_heat_loss = 0;
    }
    roomBoundary.trans_heat_loss = Number(trans_heat_loss.toFixed(1));
    roomBoundary.total_heat_loss = Number(
      (trans_heat_loss + roomBoundary.infilt_heat_loss).toFixed(1)
    );
    await roomBoundary.save();
    return roomBoundary;
  } catch (error) {
    throw error;
  }
};

// calculating values

const calculations = {};

calculations.getInsideTemperature = async (obj) => {
  try {
    // getting inside temperature
    const roomBoundary = obj;
    const roomId = roomBoundary.room1_id;
    const room = await db.room.findByPk(roomId);
    const tempInId = room.room_temperature;
    const tempInRow = await db.temperature.findByPk(tempInId);
    const tempIn = tempInRow.temperature_value;
    return tempIn;
  } catch (error) {
    throw error;
  }
};

calculations.getOutSideTemperature = async (obj) => {
  try {
    const roomBoundary = obj;
    let tempOut;
    if (!roomBoundary.groundConnected) {
      let tempOutRow = await db.temperature.findByPk(roomBoundary.out_temp_id);
      tempOut = Number(tempOutRow.temperature_value);
      return tempOut;
    }
    let tempOut_1_6_Row = await db.temperature.findOne({
      where: {
        temperature_name:
          "groundWaterFreezingTemp" || "grundvatten frys temperatur",
      },
    });
    if (!tempOut_1_6_Row) {
      throw new Errors.badRequestError(
        "ground water freezing temperature is not set for the project"
      );
    }
    tempOut = Number(tempOut_1_6_Row.temperature_value);
    return tempOut;
  } catch (error) {
    throw error;
  }
};

calculations.getUvalue = async (obj) => {
  try {
    const roomBoundary = obj;
    // getting uValue
    const uValueId = roomBoundary.uvalue_id;
    const component = await db.component.findByPk(uValueId);
    const uValue = Number(component.component_uvalue);
    return uValue;
  } catch (error) {
    throw error;
  }
};

module.exports = roomBoundaryDbServices;
