import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import todoController from "./controllers/todoController.js";
import screenController from "./controllers/screenController.js";

const appContainer = document.querySelector("#wrapper");

screenController.init(appContainer);
