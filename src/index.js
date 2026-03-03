import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import screenController from "./controllers/screenController.js";

const inboxDiv = document.querySelector(".inbox-div");
const addTodo = document.querySelector(".custom-btn.add-todo");

addTodo.addEventListener("click", () => {
  screenController.showForm(inboxDiv, addTodo);
});
