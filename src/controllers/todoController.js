import Todo from "../models/Todo.js";
import Folder from "../models/folder.js";

let archive = [
  {
    name: "Inbox",
    todos: ["Study Java", "Study React"],
  },
];

function createTodo(title, description, dueDate, priority) {
  return new Todo(title, description, dueDate, priority, false);
}

function createFolder(folderName) {
  return new Folder(folderName);
}

const fetchFolder = (folderName) => {
  return archive.find((folder) => folder.name === folderName);
};

const addFolder = (folderName) => {
  const newfolder = createFolder(folderName);
  archive.push(newfolder);
  return newfolder;
};

const addTodo = (todo) => {
  if (!todo) return;

  archive[0].todos.push(todo);
};

const deleteTodo = (todo) => {};

const deleteFolder = (folderName) => {
  archive = archive.filter((folder) => folder.name !== folderName);
};

const fetchTodos = (folderName) => {
  const folder = fetchFolder(folderName);
  return folder ? [...folder.todos] : [];
};

export default {
  addTodo,
  addFolder,
  createTodo,
  createFolder,
  deleteTodo,
  deleteFolder,
  fetchFolder,
  fetchTodos,
};
