export const projectActionTypes = {
  SET_PROJECTS: "SET_PROJECTS",
  CREATE_PROJECT: "CREATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
};

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case projectActionTypes.SET_PROJECTS:
      return {
        projects: action.payload,
      };
    case projectActionTypes.CREATE_PROJECT:
      return {
        projects: [...state.projects, action.payload], // since it's a new single work out and an array of pre-existing projects
      };
    case projectActionTypes.DELETE_PROJECT:
      return {
        projects: state.projects.filter(
          (project) => project.project_id !== action.payload.project_id
        ),
      };
    case projectActionTypes.UPDATE_PROJECT:
      let project = state.projects.find(
        (project) => project.project_id === action.payload.project_id
      );
      Object.assign(project, action.payload);
      return {
        projects: state.projects,
      };
    default:
      return state;
  }
};
