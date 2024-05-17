import { Router } from "express";
import {
    getTodos,
    getTodoById,
    toggleComplete,
    deleteTodo,
    createTodo,
    updateTodo,
    addSubTodo,
    removeSubTodo
} from "../controllers/todo.controller.js";

// middlewares
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// router.use(verifyJWT);  Apply verifyJWT middleware to all routes in this file

// secured routes
router.route('/get-todos').post(getTodos);
router.route('/get-todo/:id').get(getTodoById);
router.route('/toggle/complete-status').post(toggleComplete);
router.route('/delete-todo').post(deleteTodo);
router.route('/create-todo').post(createTodo);
router.route('/update-todo', updateTodo);
router.route('/add-subtodo', addSubTodo);
router.route('/remove-subtodo', removeSubTodo);

export default router