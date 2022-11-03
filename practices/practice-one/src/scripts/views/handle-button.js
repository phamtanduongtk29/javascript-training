export default async function handleButtonSendRequest(button, callback) {
    button.disabled = true;
    const data = await callback();
    console.log(data);
    if (Object.keys(data).length && data !== undefined) {
        button.disabled = false;
    }
}
