
export function initTodoForm(onSuccess) {
  const form = document.getElementById("todo-form");
  const dialog = document.getElementById("todo-dialog");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      title: document.getElementById("todo-title").value,
      description: document.getElementById("todo-description").value,
      dueDate: document.getElementById("todo-date").value,
      priority: document.getElementById("todo-priority").value,
    };

    onSuccess(formData);

    form.reset();
    dialog.close();
  });

  const cancelBtn = document.getElementById("todo-cancel-btn");
  cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
  })
}