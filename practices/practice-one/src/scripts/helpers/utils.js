import axios from 'axios';

export const querySelector = document.querySelector.bind(document);
export const querySelectorAll = document.querySelectorAll.bind(document);
export const axiosClient = axios.create();

axiosClient.interceptors.response.use((res) => res.data);
