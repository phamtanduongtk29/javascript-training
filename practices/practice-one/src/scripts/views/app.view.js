import { querySelector } from '../helpers/index.js';

import Controller from '../controllers/student.controller';
import StudentItemView from './student-item.view.js';
import FillterView from './fillter.view.js';

export default class App {
    #ulElement;
    #messageEl;

    #controller;
    #filter;

    #overlay;
    #formUpdate;
    #formAdd;
    #closeIcon;

    constructor() {
        this.#controller = new Controller();
        this.#filter = new FillterView(this.#controller, this);
        this.#ulElement = querySelector('.students');
        this.#messageEl = querySelector('.message');
        this.#overlay = querySelector('.overlay');
        this.#formUpdate = querySelector('.form-update-wrapper');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#closeIcon = this.#formUpdate.querySelector('.icon-item');
    }

    async start() {
        const respone = await this.#controller.getStudents();
        this.render(respone);
        this.#addEvent();
        this.#filter.init();
    }

    async render(respone) {
        respone.isError
            ? alert(respone.message)
            : (() => {
                  this.#messageEl.style.display = !respone.data.length
                      ? 'block'
                      : 'none';
                  this.#ulElement.innerHTML = '';
                  respone.data.forEach(({ id, name, image }) => {
                      const sudentItem = new StudentItemView(id, name, image);
                      this.#ulElement.appendChild(sudentItem.createElement());
                  });
              })();
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
