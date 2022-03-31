import { html, render } from '../lib.js';

const notificationElement = document.getElementById('errorBox');

const notificationTemplate = (errMessage) => html`
    <span>${errMessage}</span>`;

export async function showNotification(errMessage) {
    notificationElement.style.display = 'block';
    render(notificationTemplate(errMessage), notificationElement);
    await setTimeout(() => {
        if (notificationElement.style.display == 'block') {
            notificationElement.style.display = 'none';
        } else {
            notificationElement.style.display = 'block'  
        }
    }, 3000);
}
