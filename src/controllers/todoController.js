import Todo from "../models/Todo.js";
import Project from "../models/Project.js";
import { parse } from "date-fns";

const loadStorage = () => {
  const archive = {
    inbox: [],
    projects: [],
  };

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    const raw = JSON.parse(localStorage.getItem(key));

    if (key.startsWith("item")) {
      const todo = Todo.fromJSON(raw);
      archive.inbox.push(todo);
    } else if (key.startsWith("project")) {
      const project = Project.fromJSON(raw);
      archive.projects.push(project);
    }
  }
  return archive;
};

const updateStorage = (item) => {
  let id;
  if (item instanceof Todo) {
    id = item.getId();
    localStorage.setItem(`item-${id}`, JSON.stringify(item));
  }

  if (item instanceof Project) {
    id = item.getId();
    localStorage.setItem(`project-${item.getId()}`, JSON.stringify(item));
  }
};

const addProject = (projectName) => {
  if (!projectName || !projectName.trim()) return null;

  const normalizedProjectName = projectName.trim();
  const projects = loadStorage().projects;
  const projectExists = projects.some(
    (project) => project.getProjectName() === normalizedProjectName,
  );

  if (projectExists) {
    return { error: "Project already exists! Please try another name." };
  }

  const newProject = new Project(normalizedProjectName);
  updateStorage(newProject);
  return { ok: "Project added successfully!" };
};

const addTodo = ({ task, dueDate, projectName } = {}) => {
  if (!task || !task.trim()) {
    return { error: "Task cannot be empty!" };
  }

  if (!dueDate) {
    return { error: "Please pick a due date!" };
  }

  const newTodo = new Todo(task.trim(), false, dueDate);

  if (projectName) {
    const project = fetchProject(projectName);
    if (!project) {
      return { error: "Project not found." };
    }

    project.addTodo(newTodo);
    updateStorage(project);
  } else {
    updateStorage(newTodo);
  }

  return { ok: "Todo added successfully!" };
};

const deleteTodo = (item) => {
  let id;
  if (item instanceof Todo) {
    id = item.getId();
    localStorage.removeItem(`item-${id}`);
  }
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

const fetchProject = (projectName) => {
  const archive = loadStorage();
  const project = archive.projects.find(
    (p) => p.getProjectName() === projectName,
  );
  return project;
};

export default {
  addTodo,
  addProject,
  convertDateFormat,
  deleteTodo,
  fetchProject,
  loadStorage,
  updateStorage,
};
