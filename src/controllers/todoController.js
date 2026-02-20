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
  if (!task || !task.trim()) return;

  const todo = new Todo(task.trim(), false);

  if (!projectName) {
    archive.inbox.push(todo);
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

const deleteTodo = (task, projectName) => {
  if (!task || !task.trim()) return;

  if (!projectName || !projectName.trim()) {
    archive.inbox = archive.inbox.filter((t) => t.getTitle() !== task);
  } else {
    archive.projects = archive.projects.map((project) => {
      if (project.name === projectName) {
        const updatedTodos = project.todos.filter((t) => t.getTitle() !== task);
        return { ...project, todos: updatedTodos };
      }
    });
  }
};

const fetchArchive = () => {
  return {
    inbox: [...archive.inbox],
    projects: [...archive.projects],
  };
};

export default {
  addTodo,
  addProject,
  deleteTodo,
  fetchArchive,
};
