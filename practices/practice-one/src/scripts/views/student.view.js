import { querySelector } from '../helpers/utils.js';

import Controller from '../controllers/student.controller';
import StudentItemView from './student-item.view.js';

export default class StudentView {
    #ulElement;
    #controller;

    #overlay;
    #formUpdate;
    #formAdd;
    #closeIcon;
    constructor() {
        this.#controller = new Controller();
        this.#ulElement = querySelector('.students');
        this.#overlay = querySelector('.overlay');
        this.#formUpdate = querySelector('.form-update-wrapper');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#closeIcon = this.#formUpdate.querySelector('.icon-item');
    }

    init() {
        this.#render();
        this.#addEvent();
    }

    async #render() {
        const respone = await this.#controller.getStudents();
        if (respone.isError) {
            alert(respone.message);
        } else {
            respone.data.forEach(({ id, name, image }) => {
                const sudentItem = new StudentItemView(id, name, image);
                this.#ulElement.appendChild(sudentItem.createElement());
            });
        }
    }

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
