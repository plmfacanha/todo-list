import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import screenController from "./controllers/screenController.js";

if (Storage.length <= 0) {
  console.log("Storage is empty!");
} else {
  console.log("Storage is not empty!");
  console.log(localStorage);
}

screenController.init();
