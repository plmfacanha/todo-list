import Todo from "../models/Todo.js";
import Project from "../models/Project.js";
import { parse } from "date-fns";

const loadStorage = () => {
  const archive = {
    default: [],
    projects: [],
  };

  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    const raw = JSON.parse(localStorage.getItem(key));

    if (key.startsWith("item")) {
      const todo = Todo.fromJSON(raw);
      archive.default.push(todo);
    } else if (key.startsWith("project")) {
      const project = Project.fromJSON(raw);
      archive.projects.push(project);
    }
  }
  return archive;
};

const updateStorage = (item) => {
  if (item instanceof Todo) {
    const id = item.getId();
    localStorage.setItem(`item-${id}`, JSON.stringify(item));
  }

  if (item instanceof Project) {
    localStorage.setItem(`project-${item.getId()}`, JSON.stringify(item));
  }
};

const addProject = (project) => {
  updateStorage(project);
};

const addTodo = (task, dueDate) => {
  if (!task || !task.trim()) return null;

  if (!dueDate) return null;

  const todo = new Todo(task.trim(), false, dueDate);
  updateStorage(todo);
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

export default {
  addTodo,
  addProject,
  deleteTodo,
  convertDateFormat,
  loadStorage,
  updateStorage,
};
