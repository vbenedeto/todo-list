import { createProject } from "./project";
import { createTodo } from "./todo";

export function storeProjects(projects) {
  const jsonData = JSON.stringify(projects);
  localStorage.setItem("projectsData", jsonData);
}

export function loadProjects(defaultProjects) {
  const projectsJson = localStorage.getItem("projectsData");

  if (projectsJson) {
    const parsedProjects = JSON.parse(projectsJson);

    const finalProjectsObj = parsedProjects.map((rawProject) => {
      const project = createProject(rawProject.name);

      rawProject.todos.forEach((rawTodo) => {
        const todo = createTodo(rawTodo);
        project.addTodo(todo);
      });

      return project;
    });
    return finalProjectsObj;
  }
  return defaultProjects;
}