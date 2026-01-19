import './styles.css';
import { createTodo } from "./todo";
import { renderProjects, renderTodos, setupModal } from "./displayController";
import { initTodoForm } from './formHandler';
import { getInitialProjects } from './initialData';

// State
const projects = getInitialProjects();
let currentProject = projects[0];

// Handlers
function refreshTasks() {
  renderTodos(currentProject, handleDeleteTodo);
}

const handleDeleteTodo = (todoId) => {
  currentProject.removeTodo(todoId);
  refreshTasks();
};

// Initialization 
setupModal();

initTodoForm((formData) => {
  const newTodo = createTodo(formData);
  currentProject.addTodo(newTodo);
  refreshTasks();
})

renderProjects(projects, currentProject, (selectedProject) => {
  currentProject = selectedProject;
  refreshTasks();
});

// Start the App
refreshTasks();

