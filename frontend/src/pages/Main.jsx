import React, { useEffect, useState } from 'react'
import InfiniteScroll from '../components/InfiniteScroll';
import axios from "../api/axios.js";
import Todos from '../components/Todos.jsx';
import { useAuth } from '../context/AuthProvider.js';

const Main = () => {
    const today = new Date();
    const { auth } = useAuth();
    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("");

    // Formatting the date to "Month Day"
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    const [showSubTodos, setShowSubTodos] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setCompleted(!completed);
    };

    const toggleSubTodos = () => {
        setShowSubTodos(!showSubTodos);
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.post('http://localhost:8000/v1/api/todos/get-todos',
                { userId: auth._id },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    withCredentials: true
                }
            );
            console.log(response.data.data);
            setTodos(response.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/v1/api/todos/create-todo',
                {
                    content,
                    userId: auth._id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    }
                },
                { withCredentials: true }
            );
            fetchTodos();

        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteTodo = async (todoId) => {

        try {
            console.log(todoId);
            const response = await axios.post('http://localhost:8000/v1/api/todos/delete-todo',
                {
                    todoId,
                    userId: auth._id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`
                    },
                    withCredentials: true,
                }

            );
            console.log(response);
            fetchTodos();

        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='h-screen w-full bg-gray-100 flex justify-center items-center'>
            <div className='max-sm:w-full h-[80%] w-[60%] rounded-3xl bg-gray-200 shadow-lg'>
                <div className='px-12 py-8'>
                    <InfiniteScroll />
                </div>
                <div className="flex flex-col items-center w-full">
                    <div className='py-4 place-items-start'>
                        <p className='text-4xl'>Hello, <span className="text-blue-300">Onkar Kale</span></p>
                        <p className='text-3xl my-1'>it's {formattedDate}</p>
                    </div>
                    <div className="flex items-center rounded-md my-2 justify-center w-3/4">
                        <input
                            type="text"
                            className="flex-1 py-2 px-3 rounded-md mx-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add a task"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button className="py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg"
                            onClick={addTodo}>
                            +
                        </button>
                    </div>
                </div>
                <div className='bg-gray-200 rounded-xl'>
                    {
                        todos.map((todo) => (
                            <div className='flex justify-center my-2'>
                                <div className='px-2 bg-blue-200 w-3/4 h-12 border-blue-400 rounded-xl flex justify-between items-center'>
                                    <div className="flex items-center space-x-2">
                                        {/* Circular Checkbox */}
                                        <input
                                            type="checkbox"
                                            checked={completed}
                                            onChange={handleCheckboxChange}
                                            className="h-5 w-5 cursor-pointer rounded-full"
                                        />
                                        <p>{todo.content}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Delete Button */}
                                        <svg
                                            className="h-5 w-5 cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            onClick={() => deleteTodo(todo._id)}
                                        >
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                        {/* Edit Button */}
                                        <svg
                                            className="h-8 w-8 cursor-pointer"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* {showSubTodos && todo.subTodos.length > 0 && (
                <div className="ml-5">
                    <select>
                        {todo.subTodos.map(subTodo => (
                            <option key={subTodo.id} value={subTodo.id}>{subTodo.content}</option>
                        ))}
                    </select>
                </div>
            )} */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Main