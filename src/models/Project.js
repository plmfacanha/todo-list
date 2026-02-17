export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  getName() {
    return this.name;
  }

  setProjectName(newProjectName) {
    this.name = newProjectName;
  }

  getTodos() {
    return this.todos;
  }

  addNewTodo(todo) {
    this.todos.push(todo);
  }
}
