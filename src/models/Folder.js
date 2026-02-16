export default class Folder {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  getName() {
    return this.name;
  }

  setFolderName(newFolderName) {
    this.name = newFolderName;
  }

  getTodos() {
    return this.todos;
  }

  addNewTodo(todo) {
    this.todos.push(todo);
  }
}
