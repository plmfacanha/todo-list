export default class Todo {
  #title;
  #checklist;

  constructor(title, checklist) {
    this.id = Math.floor(Math.random() * 1_000_000);
    this.#title = title;
    this.#checklist = checklist;
  }

  getTitle() {
    return this.#title;
  }

  getChecklist() {
    return this.#checklist;
  }

  setTitle(newTitle) {
    this.#title = newTitle;
  }

  setChecklist(newChecklist) {
    this.#checklist = newChecklist;
  }

  toggleChecklist() {
    this.#checklist = !this.#checklist;
  }
}
