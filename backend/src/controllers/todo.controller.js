import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.models.js";
import { SubTodo } from "../models/sub_todo.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";

const getTodos = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "userId is invalid");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    // getting todos from database
    const todos = await Todo.find({
        createdBy: user?._id
    })
    if (!todos) {
        throw new ApiError(404, "No todo added");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, todos, "todos fetched successfully")
        );

});

const getTodoById = asyncHandler(async (req, res) => {
    const { todoId } = req.params;

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(401, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "todoId is invalid");
    }

    const todo = await Todo.find({
        _id: todoId,
        createdBy: req.user?._id
    });
    if (!todo) {
        throw new ApiError(404, "No such todo exist with this todoId");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, todo, "todo fetched successfully")
        )
});

const toggleComplete = asyncHandler(async (req, res) => {
    const { todoId } = req.body;

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(401, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "todoId is invalid");
    }

    // finding if the todo exists
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    if (todo.createdBy.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    const statusChangedTodo = await Todo.findByIdAndUpdate(
        todo?._id,
        {
            $set: {
                isComplete: !todo.isComplete
            }
        },
        {
            new: true
        }
    );
    // Check if the todo was updated successfully
    if (!statusChangedTodo) {
        throw new ApiError(401, "Error while changing status");
    }

    // retuning updated todo
    return res
        .status(200)
        .json(
            new ApiResponse(200, statusChangedTodo, "status chnaged successfully")
        );
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId, userId } = req.params;

    console.log(todoId);
    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(401, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "todoId is invalid");
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
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    if (todo.createdBy.toString() !== user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }


    // deleting if the todo exists 
    const deletedTodo = await Todo.findByIdAndDelete(todo?._id);
    if (!deleteTodo) {
        throw new ApiError(500, "Error while deleting todo");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedTodo, "todo deleted successfully")
        );

});

const createTodo = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { userId } = req.body;

    // validating content
    if (!content || content.trim() === "") {
        throw new ApiError(401, "content is required");
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

    const createdTodo = await Todo.create({
        content,
        createdBy: user?._id
    })
    if (!createdTodo) {
        throw new ApiError(500, "Error while creating todo");
    };

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdTodo, "todo created successfully")
        );

});

const updateTodo = asyncHandler(async (req, res) => {
    const { newContent } = req.body;
    const { todoId } = req.body;

    // validating content
    if (!content || content.trim() === "") {
        throw new ApiError(401, "content is required");
    }

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(401, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(401, "todoId is invalid");
    }

    // finding if the todo exists
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    if (todo.createdBy.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        todo?._id,
        {
            $set: {
                content: newContent
            }
        },
        {
            new: true
        }
    );
    if (!updatedTodo) {
        throw new ApiError(500, "Error while updating todo");
    }

    return res
        .status(200)
        .json(
            new ApiError(200, updatedTodo, "Todo updated successfully")
        );
});

const addSubTodo = asyncHandler(async (req, res) => {
    const { content, todoId } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "content is required");
    }

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(400, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(400, "todoId is invalid");
    }

    // finding todo using todoId
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    // check if the user is authorized to update the todo
    if (todo.createdBy.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    // creating a new sub todo
    const createdSubTodo = await SubTodo.create({
        content,
        createdBy: req.user?._id
    })
    if (!createdSubTodo) {
        throw new ApiError(500, "Error while creating sub todo");
    }

    // adding the subtodo in the subTodo array
    const updatedTodo = await Todo.findByIdAndUpdate(
        todo?._id,
        {
            $addToSet: {
                subTodos: createdSubTodo._id
            }
        },
        {
            new: true
        }
    );
    if (!updatedTodo) {
        throw new ApiError(500, "Error while adding sub todo");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTodo, "sub todo added successfully")
        );
});

const removeSubTodo = asyncHandler(async (req, res) => {
    const { todoId, subTodoId } = req.body;

    // validating todoId
    if (!todoId || todoId.trim() === "") {
        throw new ApiError(400, "todoId is required");
    }
    if (!isValidObjectId(todoId)) {
        throw new ApiError(400, "todoId is invalid ObjectId");
    }

    // validating todoId
    if (!subTodoId || subTodoId.trim() === "") {
        throw new ApiError(400, "subTodoId is required");
    }
    if (!isValidObjectId(subTodoId)) {
        throw new ApiError(400, "subTodoId is invalid ObjectId");
    }

    // finding todo using todoId
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }

    // check if the user is authorized to update the todo
    if (todo.createdBy.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        todo?._id,
        {
            $pull: {
                subTodos: subTodoId
                // removes the sub todo from the subTodo array
            }
        },
        {
            new: true
        }
    );
    if (!updatedTodo) {
        throw new ApiError(500, "Error while removing sub todo");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTodo, "sub todo removed successfully")
        )
});

export {
    getTodos,
    getTodoById,
    toggleComplete,
    deleteTodo,
    createTodo,
    updateTodo,
    addSubTodo,
    removeSubTodo
}