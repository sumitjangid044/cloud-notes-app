import axios from 'axios';

const instance = axios.create({
  baseURL: "https://cloud-notes-app-3.onrender.com/api",
});

export default instance;
