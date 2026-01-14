import { createTodo } from "./todo";
import { createProject } from "./project";

const projects = [];

const generalProject = createProject("General");
const defaultWorkProject = createProject("Work");

const myWorkTodo1 = createTodo({
  title: "Finish Odin Project",
  description: "Complete the Todo List assignment",
  dueDate: "20-01-2026",
  priority: "High"
});

const myWorkTodo2 = createTodo({
  title: "Attend Teams Meeting",
  description: "Attend Teams online meeting to talk about new marketing strategy at 15PM",
  dueDate: "25-01-2026",
  priority: "High"
})

defaultWorkProject.addTodo(myWorkTodo1);
defaultWorkProject.addTodo(myWorkTodo2);

const myGeneralTodo1 = createTodo({
  title: "Wash White Clothes",
  description: "Wash white colored clothes in the washing machine",
  dueDate: "14-01-2026",
  priority: "Medium"
})

const myGeneralTodo2 = createTodo({
  title: "Prepare Week Meal",
  description: "Cook meal for the week and add it into containers that later go into the fridge",
  dueDate: "14-01-2026",
  priority: "High"
})

generalProject.addTodo(myGeneralTodo1);
generalProject.addTodo(myGeneralTodo2);

console.log(defaultWorkProject);
console.log(generalProject);





