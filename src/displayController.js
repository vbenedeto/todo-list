import { format, parseISO } from "date-fns";
import { showConfirm } from "./confirmationHandler";

export function renderProjects({ projects, activeProject, onSelect, onDelete }) {
  const projectMenu = document.getElementById("projects-menu");
  projectMenu.textContent = "";

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-list__item");

    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;
    projectBtn.classList.add("project-list__btn-select");

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "🗑️";
    deleteProjectBtn.classList.add("project-list__btn-delete");

    if (activeProject && project.name === activeProject.name) {
      projectBtn.classList.add("project-list__btn-select--active");
    }

    projectItem.append(projectBtn, deleteProjectBtn);
    projectMenu.appendChild(projectItem);

    projectBtn.addEventListener("click", () => {
      const allBtns = document.querySelectorAll(".project-list__btn-select");
      allBtns.forEach(btn => btn.classList.remove("project-list__button--active"));
      projectBtn.classList.add("project-list__button--active");

      onSelect(project);
    });

    deleteProjectBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const userConfirmed = await showConfirm("Delete Project", "Are you sure? This Project and its Tasks will be gone forever.");

      if (userConfirmed) {
        onDelete(project);
      }
    })
  });
  return projects;
}

function renderEmtpyState(container, message) {
  const emptyMessage = document.createElement("div");
  emptyMessage.classList.add("todo-grid__empty-state");
  emptyMessage.textContent = message;
  container.appendChild(emptyMessage);
}

export function renderTodos(project, onDelete, onEdit) {
  const projectTitle = document.querySelector(".project-title");
  const todoGridContainer = document.querySelector(".todo-grid");
  todoGridContainer.textContent = "";

  if (!project) {
    projectTitle.textContent = "Get Startet!";
    renderEmtpyState(todoGridContainer, "No projects left! Add one to start.")
    return;
  }

  projectTitle.textContent = project.name;

  if (project.todos.length === 0) {
    renderEmtpyState(todoGridContainer, "This project is empty. Time to add some tasks!");
    return;
  }

  project.todos.forEach((todo) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.dataset.priority = todo.priority;

    const todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;
    todoTitle.classList.add("todo-card__title");

    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description;
    todoDescription.classList.add("todo-card__description");

    const todoDueDate = document.createElement("p");
    const formatedDate = format(parseISO(todo.dueDate), "dd-MM-yyyy");
    todoDueDate.innerHTML = `📅 ${formatedDate}`;
    todoDueDate.classList.add("todo-card__date")

    const todoPriority = document.createElement("p");
    todoPriority.textContent = todo.priority;
    todoPriority.classList.add("todo-card__priority");

    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.textContent = "Delete";
    deleteTodoBtn.classList.add("todo-card__delete");

    const editTodoBtn = document.createElement("button");
    editTodoBtn.textContent = "Edit";
    editTodoBtn.classList.add("todo-card__edit");

    const actionBtnsContainer = document.createElement("div");
    actionBtnsContainer.appendChild(deleteTodoBtn);
    actionBtnsContainer.appendChild(editTodoBtn);
    actionBtnsContainer.classList.add("todo-card__actions");

    deleteTodoBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const userConfirmed = await showConfirm("Delete Task", "Are you sure? This task will be gone forever.");

      if (userConfirmed) {
        onDelete(todo.id);
      }
    })

    editTodoBtn.addEventListener("click", () => {
      onEdit(todo);
    })

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDueDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(actionBtnsContainer);
    todoGridContainer.appendChild(todoCard);
  });
}

export function setupModal() {
  const dialog = document.getElementById("project-dialog");
  const openBtn = document.getElementById("add-project-btn");
  const closeBtn = document.getElementById("project-cancel-btn");

  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}

export function bindAddTaskButton(onOpen) {
  const addTaskBtn = document.getElementById("add-todo");
  addTaskBtn.addEventListener("click", () => {
    onOpen();
  })
}

export function toggleAddTaskButton(visible) {
  const addTaskBtn = document.getElementById("add-todo");

  if (visible) {
    addTaskBtn.style.display = "block";
  } else {
    addTaskBtn.style.display = "none";
  }
}

export function openTodoModal(todo = null) {
  const dialog = document.getElementById("todo-dialog");
  const form = document.getElementById("todo-form");
  const modalTitle = document.querySelector(".todo-form__title");
  const submitBtn = document.getElementById("todo-submit-btn");

  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const dueDateInput = document.getElementById("todo-date");
  const priorityInput = document.getElementById("todo-priority");

  if (todo) {
    modalTitle.textContent = "Edit Task";
    submitBtn.textContent = "Save Changes";
    form.dataset.editId = todo.id;

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueDateInput.value = format(todo.dueDate, "yyyy-MM-dd");
    priorityInput.value = todo.priority;

  } else {
    modalTitle.textContent = "New Task";
    submitBtn.textContent = "Add Todo";
    delete form.dataset.editId;

    form.reset();
  }

  dialog.showModal();
}