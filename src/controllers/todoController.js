import Todo from "../models/Todo.js";
import Project from "../models/Project.js";

const archive = {
  default: [],
  projects: [],
};

const addProject = (project) => {
  archive.projects.push(project);
};

const addTodo = (task, projectName) => {
  if (!task || !task.trim()) return;

  const todo = new Todo(task.trim(), false, new Date());

  if (!projectName) {
    archive.default.push(todo);
    return;
  }

  const project = archive.projects.find((p) => p.getName() === projectName);

  if (project) {
    project.addTodo(todo);
  } else {
    const newProject = new Project(projectName);
    newProject.addTodo(todo);
    addProject(newProject);
  }
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
  fetchArchive,
};
