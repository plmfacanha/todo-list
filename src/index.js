import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import screenController from "./controllers/screenController.js";

if (!localStorage.getItem("whatever")) {
  populateStorage();
} else {
  setTodoList();
}

screenController.init();
