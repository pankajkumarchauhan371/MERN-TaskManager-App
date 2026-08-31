import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
};

export const API_BASE_URL = 'http://localhost:4800';