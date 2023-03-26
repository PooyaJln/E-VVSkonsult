import { createContext, useReducer } from "react";

export const ProjectsContext = createContext();

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        projects: [...state.projects, action.payload], // since it's a new single work out and an array of pre-existing projects
      };
    case "DELETE_PROJECT":
      return {
        projects: state.projects.filter(
          (project) => project.project_id !== action.payload.project_id
        ),
      };
    case "UPDATE_PROJECT":
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

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: null,
  });

  return (
    <ProjectsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};
