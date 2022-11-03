import axios from 'axios';

/**
 * Query element DOM.
 * @param {String} selector (Dss selector, Tagname, ....)
 * @return {Element} first element DOM query
 */
export const querySelector = document.querySelector.bind(document);

/**
 * Query element DOM.
 * @param {String} selector (Dss selector, Tagname, ....)
 * @return {Element} all element DOM query
 */
export const querySelectorAll = document.querySelectorAll.bind(document);

export const axiosClient = axios.create();

/**
 * return data configuration
 */
axiosClient.interceptors.response.use((res) => res.data);
