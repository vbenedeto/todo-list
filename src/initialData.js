import { createProject } from "./project";
import { createTodo } from "./todo";

export function getInitialProjects() {
  const general = createProject("General");
  const work = createProject("Work");

  const generalTodo1 = createTodo({
    title: "Wash White Clothes",
    description: "Wash white colored clothes in the washing machine",
    dueDate: "14-01-2026",
    priority: "Medium"
  });

  const generalTodo2 = createTodo({
    title: "Prepare Week Meal",
    description: "Cook meal for the week and add it into containers that later go into the fridge",
    dueDate: "14-01-2026",
    priority: "High"
  });

  const workTodo1 = createTodo({
    title: "Finish Odin Project",
    description: "Complete the Todo List assignment",
    dueDate: "20-01-2026",
    priority: "High"
  });

  const workTodo2 = createTodo({
    title: "Attend Teams Meeting",
    description: "Attend Teams online meeting to talk about new marketing strategy at 15PM",
    dueDate: "25-01-2026",
    priority: "High"
  })

  general.addTodo(generalTodo1);
  general.addTodo(generalTodo2);
  work.addTodo(workTodo1);
  work.addTodo(workTodo2);

  return [general, work];
}