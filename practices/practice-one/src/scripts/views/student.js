import { querySelector } from '../helpers/utils.js';

import Controller from '../controllers/main-controllers.js';

export default class StudentView {
    #ulElement;
    #controller;
    constructor() {
        this.#controller = new Controller();
        this.#ulElement = querySelector('.students');
    }

    init() {
        this.#showStudent();
    }

    async #showStudent() {
        const respone = await this.#controller.getStudents();
        console.log(respone);
    }

    #showProfile(id) {}

    #createStudentItem(id, name, image = './assets/images/student.jpg') {
        const liElement = document.createElement('li');
        liElement.classList.add('student');
        liElement.setAttribute('id', id);
        liElement.innerHTML = `<li class="student-item"><div
            class="student-item-image"
            style="
                background-image: url(${image});
            "
        ></div>
        <p class="student-item-name">${name}</p>`;
        liElement.addEventListener('click', (e) => {
            this.#showProfile(id);
        });
        return liElement;
    }
}
