
export function createProject(name) {
  const todos = [];

  return {
    name,
    todos,
    addTodo(todo) {
      todos.push(todo);
    }
  };
}