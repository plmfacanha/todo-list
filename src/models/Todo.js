export default class Todo {
  #id;
  #title;
  #checklist;
  #dueDate;

  constructor(title, checklist, dueDate) {
    this.#id = Math.floor(Math.random() * 1_000_000);
    this.#title = title;
    this.#checklist = checklist;
    this.#dueDate = dueDate;
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getChecklist() {
    return this.#checklist;
  }

  getDueDate() {
    return this.#dueDate;
  }

  setTitle(newTitle) {
    this.#title = newTitle;
  }

  setChecklist(newChecklist) {
    this.#checklist = newChecklist;
  }

  setDueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }

  toggleChecklist() {
    this.#checklist = !this.#checklist;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      checklist: this.#checklist,
      dueDate: this.#dueDate?.toISOString?.() ?? this.#dueDate,
    };
  }

  static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.checklist ?? false,
      data.dueDate ? new Date(data.dueDate) : null,
    );
    todo.#id = data.id;
    return todo;
  }
}
