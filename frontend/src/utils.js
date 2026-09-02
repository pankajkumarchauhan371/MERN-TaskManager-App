import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
};

export const API_BASE_URL = 'https://task-manager-xi-nine-32.vercel.app';
