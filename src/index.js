import './styles.css';
import { createTodo } from "./todo";
import { bindAddTaskButton, openTodoModal, renderProjects, renderTodos, setupModal, toggleAddTaskButton } from "./displayController";
import { initProjectForm, initTodoForm } from './formHandler';
import { getInitialProjects } from './initialData';
import { createProject } from './project';
import { loadProjects, storeProjects } from './storage';

// State
const defaultData =  getInitialProjects();
let projects = loadProjects(defaultData);
let currentProject = projects[0];

// Handlers
function handleSelectProject(project) {
  currentProject = project;
  refreshUI();
}

function handleDeleteProject(project) {
  const index = projects.indexOf(project);

  if (index !== -1) {
    projects.splice(index, 1);
  }

  if (project === currentProject) {
    currentProject = projects.length > 0 ? projects[0] : null;
  }

  refreshUI();
}

function handleDeleteTodo(todoId) {
  currentProject.removeTodo(todoId);
  refreshUI();
};

function refreshUI() {
  renderProjects({
    projects: projects,
    activeProject: currentProject,
    onSelect: handleSelectProject,
    onDelete: handleDeleteProject
  });

  renderTodos(currentProject, handleDeleteTodo, (todo) => {
    openTodoModal(todo);
  });

  if (!currentProject) {
    toggleAddTaskButton(false);
  } else {
    toggleAddTaskButton(true);
  }
  storeProjects(projects);
}

// Initialization 
setupModal("project-dialog", "add-project", "project-cancel-btn");

bindAddTaskButton(() => {
  openTodoModal();
})

initTodoForm((formData) => {
  const { id, ...data } = formData;

  if (id) {
    currentProject.updateTodo(id, data);
  } else {
    if (!currentProject) return alert("Please create a project first!");
    const newTodo = createTodo(formData);
    currentProject.addTodo(newTodo); 
  }

  refreshUI();
})

initProjectForm((formData) => {
  const newProject = createProject(formData.name);
  projects.push(newProject);
  currentProject = newProject;
  refreshUI();
})

// Start the App
refreshUI();
