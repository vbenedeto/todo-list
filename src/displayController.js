
export function renderProjects({ projects, activeProject, onSelect, onDelete }) {
  const projectMenu = document.getElementById("projects-menu");
  projectMenu.textContent = "";

  projects.forEach((project) => {
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;
    projectBtn.classList.add("project-btn");

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "🗑️";

    btnContainer.append(projectBtn, deleteProjectBtn);

    if (activeProject && project.name === activeProject.name) {
      projectBtn.classList.add("active-project");
    }

    projectMenu.appendChild(btnContainer);

    projectBtn.addEventListener("click", () => {
      const allBtns = document.querySelectorAll(".project-btn");
      allBtns.forEach(btn => btn.classList.remove("active-project"));
      projectBtn.classList.add("active-project");

      onSelect(project);
    });

    deleteProjectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(project);
    })
  });
  return projects;
}

export function renderTodos(project, onDelete) {
  const todoContainer = document.getElementById("todos-display");
  todoContainer.textContent = "";

  if (!project) {
    todoContainer.innerHTML = "<h2>No projects left! Add one to start.</h2>";

    return;
  }

  const projectTitle = document.createElement("h2");
  projectTitle.textContent = project.name;
  todoContainer.appendChild(projectTitle);

  project.todos.forEach((todo) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    todoCard.innerHTML = `<h3>${todo.title}</h3> <p>${todo.description}</p> <p>${todo.dueDate}</p> <p>${todo.priority}</p>`;

    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.textContent = "Delete";

    deleteTodoBtn.addEventListener("click", () => {
      onDelete(todo.id);
    })

    todoCard.appendChild(deleteTodoBtn);
    todoContainer.appendChild(todoCard);
  });
}

export function setupModal(dialogId, openBtnId, closeBtnId) {
  const dialog = document.getElementById(dialogId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}

export function toggleAddTaskButton(visible) {
  const addTaskBtn = document.getElementById("add-todo");

  if (visible) {
    addTaskBtn.style.display = "block";
  } else {
    addTaskBtn.style.display = "none";
  }
}