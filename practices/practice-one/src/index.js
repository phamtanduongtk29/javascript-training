import App from './scripts/views/app.view.js';

const start = () => {
    const app = new App();
    app.init();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
