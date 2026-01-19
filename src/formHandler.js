
export function initTodoForm(onSuccess) {
  const form = document.getElementById("todo-form");
  const dialog = document.getElementById("todo-dialog");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      title: document.getElementById("todoTitle").value,
      description: document.getElementById("todoDescription").value,
      dueDate: document.getElementById("todoDueDate").value,
      priority: document.getElementById("todoPriority").value,
    };

    onSuccess(formData);

    form.reset();
    dialog.close();
  });

  const cancelBtn = document.getElementById("cancel-btn");
  cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
  })
}