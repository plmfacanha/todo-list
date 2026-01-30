import "./styles.css";
import todoController from "./controllers/todoController.js";
import screenController from "./controllers/screenController.js";

const firstTodo = todoController.createTodo(
  "Surfar",
  "In Sombrio",
  "Today",
  "High",
);

const secondTodo = todoController.createTodo(
  "Jogar Futebol",
  "In JR",
  "Tomorrow",
  "Low",
);

const thirdTodo = todoController.createTodo(
  "Estudar Coding",
  "In Renfrew",
  "Right Now!",
  "Extremely High",
);

// debugger;
todoController.addTodo(firstTodo, "BCIT");
todoController.addTodo(secondTodo, "");
todoController.addTodo(thirdTodo);
todoController.deleteTodo(secondTodo);
todoController.deleteTodo(firstTodo, "BCIT");
todoController.printTodos();
