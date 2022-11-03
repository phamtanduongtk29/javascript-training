import { querySelector } from '../helpers/index.js';

import Controller from '../controllers/student.controller';
import StudentItemView from './student-item.view.js';

export default class StudentView {
    #ulElement;
    #messageEl;

    #controller;

    #overlay;
    #formUpdate;
    #formAdd;
    #closeIcon;

    constructor() {
        this.#controller = new Controller();
        this.#ulElement = querySelector('.students');
        this.#messageEl = querySelector('.message');
        this.#overlay = querySelector('.overlay');
        this.#formUpdate = querySelector('.form-update-wrapper');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#closeIcon = this.#formUpdate.querySelector('.icon-item');
    }

    async init() {
        const respone = await this.#controller.getStudents();
        this.render(respone);
        this.#addEvent();
    }

    async render(respone) {
        if (respone.isError) {
            alert(respone.message);
        } else {
            // If the data is empty, then notify
            if (respone.data.length) {
                this.#messageEl.style.display = 'none';
            } else {
                this.#messageEl.style.display = 'block';
            }
            this.#ulElement.innerHTML = '';
            respone.data.forEach(({ id, name, image }) => {
                const sudentItem = new StudentItemView(id, name, image);
                this.#ulElement.appendChild(sudentItem.createElement());
            });
        }
    }

    // add event close icon form update
    #addEvent() {
        this.#closeIcon.addEventListener('click', (e) => {
            this.#handleActionOverlay('none', 'none');
        });

        this.#formUpdate.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    #handleActionOverlay(overlay, formUpdate) {
        this.#overlay.style.display = overlay;
        this.#formUpdate.style.display = formUpdate;
        this.#formAdd.style.display = 'none';
    }
}
