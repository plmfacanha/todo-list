import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import screenController from "./controllers/screenController.js";

if (!localStorage.length) {
  console.log("It's empty!");
} else {
  console.log("It's not empty!");
  console.log(localStorage);
}

screenController.init();
