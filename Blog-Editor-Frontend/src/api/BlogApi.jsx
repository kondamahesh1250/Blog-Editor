// blogApi.js
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api/blogs' });

export const createDraft = (data) => API.post('/save-draft', data);
export const publishBlog = (data) => API.post('/publish', data);
export const getAllBlogs = () => API.get('/');
export const getBlogById = (id) => API.get(`/${id}`);
export const deleteBlog = (id) => API.delete(`/${id}`);