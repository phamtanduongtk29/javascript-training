/**
 * - Prevent click event
 * @param {Element} element  element DOM
 * @param {Function} callback is a function
 */
export function debounce(button, callback) {
    let timer = '';
    button.addEventListener('click', () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
            button.disabled = true;
            const data = await callback();
            if (Object.keys(data).length || data != 0) {
                button.disabled = false;
            }
        }, 600);
    });
}
