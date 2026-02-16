import Todo from "../models/Todo.js";
import Project from "../models/Project.js";
import todoController from "../controllers/todoController.js";

const inbox = document.querySelector(".inbox");
const projects = document.querySelector(".projects");

const div = document.querySelector(".addForm");
const addTodo = document.querySelector(".addTodo");
const addProject = document.querySelector(".addProject");

const displayFolder = (folder) => {};
