import { querySelector } from '../helpers/utils.js';

import Controller from '../controllers/student.controller';
import StudentItemView from './student-item.view.js';

export default class StudentView {
    #ulElement;
    #controller;
    constructor() {
        this.#controller = new Controller();
        this.#ulElement = querySelector('.students');
    }

    init() {
        this.#render();
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
}
