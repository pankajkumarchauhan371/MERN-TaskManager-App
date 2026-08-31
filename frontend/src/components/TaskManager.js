import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { FaSearch, FaPlus, FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { notify } from '../utils';
import {
    createTask, getAllTasks, deleteTask, updateTaskById
} from '../api';

const TaskManager = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);
    const [copyTasks, setCopyTasks] = useState([]);

   const fetchTasks = async () => {
    try {
        const { data } = await getAllTasks();

        console.log('API data:', data);

        setTasks(data ?? []);
        setCopyTasks(data ?? []);
    } catch (err) {
        console.error(err);
        notify('Failed to get all tasks', 'error');
    }
};

useEffect(() => {
    fetchTasks();
}, []);

    const handleAddTask = async () => {
        const taskBody = {
            taskName: input,
            isDone: false
        }
        try {
            const data = await createTask(taskBody);
            const { message, success } = data;
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to create task', 'error');
        }
    };

    const handleUpdateTask = async () => {
        const taskBody = {
            taskName: input,
            isDone: updateTask.isDone
        }
        try {
            const data = await updateTaskById(updateTask._id, taskBody);
            const { message, success } = data;
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
            setUpdateTask(null);
        } catch (err) {
            notify('Failed to create task', 'error');
        }
    };

    const handleTask = () => {
        if (input && updateTask) {
            handleUpdateTask();
        } else if (input && updateTask === null) {
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleToggleCheckUncheck = async (item) => {
        try {
            const body = {
                taskName: item.taskName,
                isDone: !item.isDone
            }
            console.log(item._id, body);
            const { success, message } = await updateTaskById(item._id, body);
            if (success) {
                notify(message, 'warning');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to update task ', 'error');
        }
    }

    const handleDeleteTask = async (item) => {
        try {
            const { success, message } = await deleteTask(item._id);
            if (success) {
                notify(message, 'success');
                fetchTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            notify('Failed to delete task ', 'error');
        }
    }
    // tasks [{},{},{}]
    // copyTasks [{},{},{},{}]
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
        <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
            <h1 className='mb-4'>Task Manager App</h1>
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <div className="input-group flex-grow-1 me-2">
                    <input type="text"
                        className="form-control me-1"
                        placeholder="Add a new task"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={() => handleTask()}
                        type="button"
                        className="btn btn-success btn-sm me-2">
                        <FaPlus className='m-2' />
                    </button>
                </div>
                <div className="input-group flex-grow-1 ">
                    <span className="input-group-text"><FaSearch /></span>
                    <input type="text"
                        onChange={handleSearch}
                        className="form-control"
                        placeholder="Search tasks" />
                </div>
            </div>
            <div className="d-flex flex-column w-100" >
                {
                    tasks.length ? tasks.map((item) => (
                        <div key={item._id} className="m-2 p-2 border bg-light
                        w-100 rounded-3 d-flex  justify-content-between align-items-center">
                            <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                                {item.taskName}
                            </span>
                            <div>
                                <button
                                    onClick={() => handleToggleCheckUncheck(item)}
                                    type="button"
                                    className="btn btn-success btn-sm me-2"><FaCheck />
                                </button>
                                <button type="button"
                                    onClick={() => setUpdateTask(item)}
                                    className="btn btn-primary btn-sm me-2"><FaPencilAlt />
                                </button>
                                <button type="button"
                                    onClick={() => handleDeleteTask(item)}
                                    className="btn btn-danger btn-sm"><FaTrash />
                                </button>
                            </div>
                        </div>
                    )) : <h2>No Task Found</h2>
                }
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default TaskManager;