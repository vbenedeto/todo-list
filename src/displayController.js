
export function renderProjects(projects, activeProject, onProjectSelect) {
  const projectMenu = document.getElementById("projects-menu");
  projectMenu.textContent = "";

  projects.forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;
    projectBtn.classList.add("project-btn");

    if (activeProject && project.name === activeProject.name) {
      projectBtn.classList.add("active-project");
    }

    projectMenu.appendChild(projectBtn);

    projectBtn.addEventListener("click", () => {
      const allBtns = document.querySelectorAll(".project-btn");
      allBtns.forEach(btn => btn.classList.remove("active-project"));
      projectBtn.classList.add("active-project");

      onProjectSelect(project);
    });
  });
  return projects;
}

export function renderTodos(project, onDelete) {
  const todoContainer = document.getElementById("todos-display");
  todoContainer.textContent = "";

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

export function setupModal() {
  const dialog = document.getElementById("todo-dialog");
  const openModalBtn = document.getElementById("add-todo");

  openModalBtn.addEventListener("click", () => {
    dialog.showModal();
  })
}