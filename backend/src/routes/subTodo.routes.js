import { Router } from "express";
import {
    getSubTodos,
    toggleComplete
} from "../controllers/subTodo.controller.js";

// middlewares
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// secured routes
router.route('/get-subTodos', getSubTodos);
router.route('/toggle/complete-status', toggleComplete);

export default router