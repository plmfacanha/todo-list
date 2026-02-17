import Todo from "../models/Todo.js";
import Project from "../models/Project.js";

const archive = {
  inbox: [],
  projects: [],
};

function createProject(projectName) {
  return new Project(projectName);
}

const addProject = (projectName) => {
  const project = createProject(projectName);

  archive.projects.push(project);
};

const addTodo = (task, projectName) => {
  if (!task) return;

  const todo = new Todo(task, false);

  if (!projectName) archive.inbox.push();
};

const deleteTodo = (todo, projectName) => {};

const fetchTodos = () => {
  return [...archive[0].todos];
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
};
