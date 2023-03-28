export const buildingActionTypes = {
  GET_BUILDING: "GET_BUILDING",
  GET_BUILDINGS: "GET_BUILDINGS",
  CREATE_BUILDING: "CREATE_BUILDING",
  DELETE_BUILDING: "DELETE_BUILDING",
  UPDATE_BUILDING: "UPDATE_BUILDING",
};

export const BuildingReducer = (state, action) => {
  switch (action.type) {
    case buildingActionTypes.GET_BUILDINGS:
      return {
        buildings: action.payload,
      };
    case buildingActionTypes.CREATE_BUILDING:
      return {
        buildings: [...state, action.payload],
      };
    case buildingActionTypes.DELETE_BUILDING:
      return {
        buildings: state.filter(
          (building) => building.building_id !== action.payload.building_id
        ),
      };
    case buildingActionTypes.UPDATE_BUILDING:
      let updatedState = state;
      let building = updatedState.find(
        (building) => building.building_id === action.payload.building_id
      );
      Object.assign(building, action.payload);
      return {
        buildings: updatedState,
      };

    default:
      return state;
  }
};
