/**
 * - Remove all error class
 * @param {Array} elements // list DOM element
 */
export const removeErrorOverlay = (elements) => {
    elements.forEach((item) => {
        item.classList.remove('error');
    });
};
