import React, { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthProvider';

const Todos = ({ todo, deleteTodo, fetchTodos }) => {
    const [isChecked, setIsChecked] = useState(todo.isComplete);
    const [showSubTodos, setShowSubTodos] = useState(false);
    // const [completed, setCompleted] = useState(false); 
    const { auth } = useAuth();

    const handleCheckboxChange = async (todoId) => {
        try {
            setIsChecked(!isChecked);
            const response = await axios.post('http://localhost:8000/v1/api/todos/toggle/complete-status',
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
            fetchTodos();
        } catch (err) {
            console.log(err.message);
        }
    };

    const toggleSubTodos = () => {
        setShowSubTodos(!showSubTodos);
    };

    return (
        <div className='flex justify-center my-2'>
            <div className='px-2 bg-blue-200 w-3/4 h-12 border-blue-400 rounded-xl flex justify-between items-center'>
                <div className="flex items-center space-x-2">
                    {/* Circular Checkbox */}
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        onChange={() => handleCheckboxChange(todo._id)}
                        className="h-5 w-5 cursor-pointer rounded-full"
                    />
                    <p>{todo.content}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Delete Button */}
                    <svg
                        className="h-5 w-5 cursor-pointer mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={() => deleteTodo(todo._id)}
                    >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                    {/* Edit Button
                    <svg
                        className="h-8 w-8 cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                    </svg> */}
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
    );
};

export default Todos;
