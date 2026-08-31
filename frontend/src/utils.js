import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
};

export const API_BASE_URL = 'https://mern-task-manager-app-lake.vercel.app/';
