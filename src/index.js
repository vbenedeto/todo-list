import './styles.css';
import { createTodo } from "./todo";
import { renderProjects, renderTodos, setupModal, toggleAddTaskButton } from "./displayController";
import { initTodoForm } from './formHandler';
import { getInitialProjects } from './initialData';

// State
const projects = getInitialProjects();
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

  renderTodos(currentProject, handleDeleteTodo);

  if (!currentProject) {
    toggleAddTaskButton(false);
  } else {
    toggleAddTaskButton(true);
  }
}

// Initialization 
setupModal();

initTodoForm((formData) => {
  if (!currentProject) {
    alert("Please create a project first!");
    return;
  }
  
  const newTodo = createTodo(formData);
  currentProject.addTodo(newTodo);
  refreshUI();
})

// Start the App
refreshUI();

