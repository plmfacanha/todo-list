import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import screenController from "./controllers/screenController.js";

if (!localStorage.length) {
  console.log("localStorage it's empty!");
} else {
  console.log("localStorage it's not empty!");
}

screenController.init();
