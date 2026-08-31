const { API_BASE_URL } = require("./utils")

export const createTask = async (reqBody) => {
    const url = `${API_BASE_URL}/tasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error(err);
        return err;
    }
}

export const getAllTasks = async () => {
    const url = `${API_BASE_URL}/tasks`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const updateTaskById = async (id, reqBody) => {
    const url = `${API_BASE_URL}/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const deleteTask = async (id) => {
    const url = `${API_BASE_URL}/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}