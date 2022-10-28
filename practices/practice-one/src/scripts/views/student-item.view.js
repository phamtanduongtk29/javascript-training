import { querySelector } from '../helpers/utils.js';
import Controller from '../controllers/student.controller.js';

export default class StudentItemView {
    #controler;
    #liElement;
    #overlay;
    #formUpdate;
    #formAdd;
    #id;
    #name;
    #image;
    constructor(id, name, image) {
        this.#controler = new Controller();
        this.#overlay = querySelector('.overlay');
        this.#formUpdate = querySelector('.form-update-wrapper');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#liElement = document.createElement('li');
        this.#liElement.classList.add('student-item');
        this.#id = id;
        this.#name = name;
        this.#image =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFIjfHSc0yfN71WXEzJBNJOH-cs1GvoVSYOg&usqp=CAU';
    }

    createElement() {
        this.#liElement.setAttribute('id', this.#id);
        this.#liElement.innerHTML = `<div class="student-item-image"
            style="background-image: url(${this.#image});"></div>
            <p class="student-item-name">${this.#name}</p>`;
        this.#liElement.addEventListener('click', (e) => {
            this.#handleViewProfile(this.#id);
        });
        return this.#liElement;
    }

    #handleActionOverlay(overlay, formUpdate) {
        this.#overlay.style.display = overlay;
        this.#formUpdate.style.display = formUpdate;
        this.#formAdd.style.display = 'none';
    }

    async #handleViewProfile(id) {
        const { isError, message, data } = await this.#controler.getProfile(id);
        if (isError) {
            alert(message);
        } else {
            if (data) {
                this.#handleActionOverlay('block', 'block');
            } else {
                alert('please wait');
            }
        }
    }
}
