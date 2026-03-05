export default class Todo {
  #title;
  #checklist;
  #dueDate;

  constructor(title, checklist, dueDate) {
    this.id = Math.floor(Math.random() * 1_000_000);
    this.#title = title;
    this.#checklist = checklist;
    this.#dueDate = dueDate;
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
}
