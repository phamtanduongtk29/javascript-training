/**
 *
 * @param {Element} button button element DOM
 * @param {Function} callback is a function
 */
export default async function handleButtonSendRequest(button, callback) {
    button.disabled = true;
    const data = await callback();
    const valid = Object.keys(data).length;
    if (valid && data !== 0) {
        button.disabled = false;
    }
}
