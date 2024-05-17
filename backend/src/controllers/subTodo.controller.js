import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.models.js";
import { User } from "../models/user.models.js";
import { SubTodo } from "../models/sub_todo.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const getSubTodos = asyncHandler(async (req, res) => {
    const { todoId } = req.body;

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(401, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "todoId is invalid");
    }

    // finding if the todo exists
    const todo = await Todo.findById(todoId).populate('subTodos');
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    // retrieving the subTodos
    const subTodos = todo.subTodos;
    if (!subTodos || subTodos.length === 0) {
        throw new ApiError(404, "No sub todos found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, subTodos, "All subTodos fetched successfully")
        )
});

const toggleComplete = asyncHandler(async (req, res) => {
    const { subTodoId, userId } = req.body;

    // validating todoId
    if (!subTodoId || subTodoId.trim() === "") {
        throw new ApiError(400, "subTodoId is required");
    }
    if (!isValidObjectId(subTodoId)) {
        throw new ApiError(400, "subTodoId is invalid ObjectId");
    }

    // validating userId
    if (!userId || userId.trim() === "") {
        throw new ApiError(401, "userId is required");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(401, "userId is invalid");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    // finding if the todo exists
    const subTodo = await SubTodo.findById(subTodoId);
    if (!subTodo) {
        throw new ApiError(404, "Sub todo does not exist");
    }

    // check if the user is authorized to update the sub todo
    if (subTodo.createdBy.toString() !== user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    const statusChangedTodo = await SubTodo.findByIdAndUpdate(
        subTodo?._id,
        {
            $set: {
                isComplete: !subTodo.isComplete
            }
        },
        {
            new: true
        }
    );
    // Check if the todo was updated successfully
    if (!statusChangedTodo) {
        throw new ApiError(400, "Error while changing status");
    }

    // retuning updated todo
    return res
        .status(200)
        .json(
            new ApiResponse(200, statusChangedTodo, "status changed successfully")
        );
});

export {
    getSubTodos,
    toggleComplete
}