import Todo from "../models/Todo.js";
import Project from "../models/Project.js";

let archive = [
  {
    name: "Inbox",
    todos: ["Study Java", "Study React"],
  },
];

function createTodo(title, description, dueDate, priority) {
  return new Todo(title, description, dueDate, priority, false);
}

function createProject(projectName) {
  return new Project(projectName);
}

const fetchProject = (projectName) => {
  return archive.find((project) => project.name === projectName);
};

const addProject = (projectName) => {
  const newProject = createProject(projectName);
  archive.push(newProject);
  return newProject;
};

const addTodo = (todo) => {};

const deleteTodo = (todo) => {};

const deleteProject = (projectName) => {
  archive = archive.filter((project) => project.name !== projectName);
};

const fetchTodos = () => {
  return archive.map((t) => t.todos);
};

const printTodos = () => {
  console.table(archive);
};

export default {
  addTodo,
  addProject,
  createTodo,
  createProject,
  deleteTodo,
  deleteProject,
  fetchProject,
  fetchTodos,
  printTodos,
};
