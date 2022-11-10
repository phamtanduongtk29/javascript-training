/**
 * - Prevent click event
 * @param {Element} element  element DOM
 * @param {Function} callback is a function
 */
export function preventSpam(element, callback) {
    element.addEventListener('click', async () => {
        element.disabled = true;
        const data = await callback();
        if (Object.keys(data).length || Boolean(data)) {
            element.disabled = false;
        }
    });
}
