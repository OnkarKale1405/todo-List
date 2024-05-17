import React, { useState } from 'react';

const Todos = ({ todo }) => {
    const [showSubTodos, setShowSubTodos] = useState(false);

    const toggleSubTodos = () => {
        setShowSubTodos(!showSubTodos);
    };

    return (
        <div className='flex justify-center my-2'>
            <div onClick={toggleSubTodos} className='px-2 bg-blue-200 w-3/4 h-12 border-blue-400 rounded-xl flex justify-between items-center'>
                <p>{todo.content}</p>
                <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
    );
};

export default Todos;
