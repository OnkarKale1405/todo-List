import React, { useEffect, useState } from 'react'
import InfiniteScroll from '../components/InfiniteScroll';
import axios from "../api/axios.js";
import Todos from '../components/Todos.jsx';
import { useAuth } from '../context/AuthProvider.js';
import useLogout from "../hooks/useLogout.js"
import { Navigate, useNavigate } from 'react-router-dom';

const Main = () => {
    const today = new Date();
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("");

    // Formatting the date to "Month Day"
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

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
            // console.log(response);
            fetchTodos();

        } catch (err) {
            console.log(err.message);
        }
    }

    const signOut = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className='h-screen w-full bg-gray-100 flex justify-center items-center relative'>
            <button onClick={signOut}
                className='py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-lg absolute top-4 right-4'>
                Logout
            </button>
            <div className='max-sm:w-full h-[80%] w-[60%] rounded-3xl'>
                {/* <div className='px-12 py-8'>
                    <InfiniteScroll />
                </div> */}
                <div className="flex flex-col items-center w-full">
                    <div className='py-4 place-items-start'>
                        <p className='text-4xl'>Hello, <span className="text-blue-300">{auth.username}</span></p>
                        <p className='text-3xl my-1'>it's {formattedDate}</p>
                    </div>
                    <div className="flex items-center rounded-md justify-center w-3/4 my-8">
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
                <div>
                    {
                        todos.map(todo => (
                            <Todos
                                key={todo._id}
                                todo={todo}
                                deleteTodo={deleteTodo}
                                fetchTodos={fetchTodos}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Main