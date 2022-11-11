import { querySelector, querySelectorAll } from '../helpers/index';

/**
 * - Remove all error class
 * @param {Array} elements // list DOM element
 */
export const removeErrorOverlay = (elements) => {
    elements.forEach((item) => {
        item.classList.remove('error');
    });
};

/**
 * Wait for data to be returned
 * @param {function} callback  a function whose return value is an object
 * @returns {Object} data after API call
 */
export const loading = async (callback) => {
    const loadEl = querySelector('.loading');
    loadEl.style.display = 'block';
    const data = await callback();
    if (data) {
        loadEl.style.display = 'none';
    }
    return data;
};

/**
 * Show empty student list message and hide search function
 */
export const checkEmptyStudent = () => {
    const students = querySelectorAll('.student-item').length;
    console.log(students);
    const message = querySelector('.message');
    message.style.display = !students ? 'block' : 'none';
};
