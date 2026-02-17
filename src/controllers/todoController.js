import Todo from "../models/Todo.js";
import Project from "../models/Project.js";

const archive = {
  inbox: [],
  projects: [],
};

const addProject = (project) => {
  archive.projects.push(project);
};

const addTodo = (task, projectName) => {
  if (!task) return;

  const todo = new Todo(task, false);

  if (!projectName) {
    archive.inbox.push(todo);
    return;
  }

  const project = archive.projects.find((p) => p.name === projectName);

  if (project) {
    project.todos.push(todo);
  } else {
    const newProject = new Project(projectName);
    newProject.todos.push(todo);
    addProject(newProject);
  }
};

const deleteTodo = (todo, projectName) => {};

export default {
  addTodo,
  addProject,
  deleteTodo,
};
