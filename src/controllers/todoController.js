import Todo from "../models/Todo.js";
import Project from "../models/Project.js";
import { parse } from "date-fns";

const archive = {
  default: [],
  projects: [],
};

const loadStorage = () => {
  console.log("Total data items in the storage: ", localStorage);
  const todo = {};
  let id;
  let count = 0;

  for (let i = 0; i < localStorage.length; ++i) {
    id = localStorage.key(i);
    todo = JSON.parse(localStorage.getItem(id));
    ++count;
  }

  console.log(todo);
};

const updateStorage = (item) => {
  if (item instanceof Todo) {
    const id = item.getId();
    item.id = id;
    item.title = item.getTitle();
    item.dueDate = item.getDueDate();

    localStorage.setItem(`item-${id}`, JSON.stringify(item));
  }
};

const addProject = (project) => {
  archive.projects.push(project);
};

const addTodo = (task, checklist, dueDate, projectName) => {
  if (!task || !task.trim()) return null;

  const todo = new Todo(task.trim(), checklist, dueDate);
  if (!projectName) {
    archive.default.push(todo);
    updateStorage(todo);
    return todo;
  }

  const project = archive.projects.find((p) => p.getName() === projectName);

  if (project) {
    project.addTodo(todo);
  } else {
    const newProject = new Project(projectName);
    newProject.addTodo(todo);
    addProject(newProject);
  }

  return todo;
};

const deleteTodo = (todo, projectName) => {
  if (!todo || !todo.trim()) return;

  if (!projectName || !projectName.trim()) {
    archive.default = archive.default.filter(
      (t) => t.getTitle() !== todo.trim(),
    );
    return;
  }

  const project = archive.projects.find(
    (p) => p.getName() === projectName.trim(),
  );
  if (!project) return;

  const updatedTodos = project
    .getTodos()
    .filter((t) => t.getTitle() !== todo.trim());
  project.setTodos(updatedTodos);
};

const convertDateFormat = (dueDate) => {
  const newDate = parse(dueDate, "yyyy-MM-dd", new Date());

  const now = new Date();

  newDate.setHours(now.getHours());
  newDate.setMinutes(now.getMinutes());
  newDate.setSeconds(now.getSeconds());
  newDate.setMilliseconds(now.getMilliseconds());

  return newDate;
};

const fetchArchive = () => {
  return {
    default: [...archive.default],
    projects: [...archive.projects],
  };
};

export default {
  addTodo,
  addProject,
  deleteTodo,
  convertDateFormat,
  fetchArchive,
  loadStorage,
  updateStorage,
};
