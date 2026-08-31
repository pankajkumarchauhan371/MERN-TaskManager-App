import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
};

export const API_BASE_URL = 'https://localhost:4800';
