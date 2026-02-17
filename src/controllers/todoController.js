import Todo from "../models/Todo.js";
import Project from "../models/Project.js";

const archive = {
  inbox: [],
  projects: [],
};

const addProject = (projectName) => {
  const project = new Project(projectName);

  archive.projects.push(project);
};

const addTodo = (task, projectName) => {
  if (!task) return;

  const todo = new Todo(task, false);

  if (!projectName) archive.inbox.push(todo);

  const project = archive.projects.find((p) => p.name === projectName);

  project.todos.push(task);
};

const deleteTodo = (todo, projectName) => {};

const fetchTodos = () => {
  return [...archive[0].todos];
};

addTodo("Study Java");

console.table(archive);

export default {
  addTodo,
  addProject,
  createTodo,
  createProject,
  deleteTodo,
  deleteProject,
  fetchProject,
  fetchTodos,
};
