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
    localStorage.setItem(`project-${id}`, JSON.stringify(item));
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

const deleteProjectTodo = (todo, projectName) => {
  const project = fetchProject(projectName);
  if (!project) return null;
  let projectTodos = fetchProjectTodos(projectName);
  if (!projectTodos) return [];

  projectTodos = projectTodos.filter((t) => t.getId() !== todo.getId());
  project.setTodos(projectTodos);

  updateStorage(project);
};

const deleteTodo = (todo) => {
  let id;
  if (todo instanceof Todo) {
    id = todo.getId();
    localStorage.removeItem(`item-${id}`);
  }
};
// TODO: Implement function that deletes a specific project based on its name
//// Check if a project is an instance of Project
//// Create a variable that stores its id
//// Remove the correspondent project from the localStorage by its id

const deleteProject = (project) => {
  let id;
  if (project instanceof Project) {
    id = project.getId();
    localStorage.removeItem(`project-${id}`);
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

const fetchProjectTodos = (projectName) => {
  const project = fetchProject(projectName);
  if (!project) return [];
  return project.getTodos();
};

const updateProjectTodo = (projectName, todo, status) => {
  const project = fetchProject(projectName);
  if (!project) return;

  const projectTodo = project
    .getTodos()
    .find((t) => t.getId() === todo.getId());

  if (!projectTodo) return;

  projectTodo.setChecklist(status);
  updateStorage(project);
};

export default {
  addTodo,
  addProject,
  convertDateFormat,
  deleteTodo,
  deleteProject,
  deleteProjectTodo,
  fetchProject,
  fetchProjectTodos,
  updateProjectTodo,
  loadStorage,
  updateStorage,
};
