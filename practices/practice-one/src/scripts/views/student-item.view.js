import { querySelector, querySelectorAll } from '../helpers/utils.js';
import Controller from '../controllers/student.controller.js';
import Student from '../models/students.model.js';

export default class StudentItemView {
    #controler;
    #liElement;
    #overlay;
    #formUpdate;
    #formAdd;

    #id;
    #name;
    #image;

    // get field
    #nameUpdate;
    #codeUpdate;
    #dateOfBirthUpdate;
    #classCodeUpdate;
    #genderUpdate;

    // get button
    #btnUpdate;
    #btnDelete;
    #icons;
    constructor(id, name, image) {
        this.#controler = new Controller();
        this.#overlay = querySelector('.overlay');
        this.#formUpdate = querySelector('.form-update-wrapper');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#liElement = document.createElement('li');
        this.#liElement.classList.add('student-item');
        this.#codeUpdate = this.#formUpdate.querySelector('#update-code');
        this.#nameUpdate = this.#formUpdate.querySelector('#update-name');
        this.#dateOfBirthUpdate = this.#formUpdate.querySelector(
            '#update-date-of-birth'
        );
        this.#classCodeUpdate =
            this.#formUpdate.querySelector('#update-class-code');
        this.#genderUpdate = this.#formUpdate.querySelector('#update-gender');
        this.#btnUpdate = querySelector('#update');
        this.#btnDelete = querySelector('#delete');
        this.#icons = querySelectorAll('.information-item-update ion-icon');
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

    #addDataFormUpdate(data) {
        this.#codeUpdate.value = data.code;
        this.#nameUpdate.value = data.name;
        this.#dateOfBirthUpdate.value = data.dateOfBirth;
        this.#classCodeUpdate.value = data.classCode;
        this.#genderUpdate.value = data.gender;
    }

    #addEventIconUpdate() {
        this.#icons.forEach((icon) => {
            icon.onclick = (e) => {
                const input = e.target.parentElement.querySelector('input');
                input.disabled = !input.disabled;
                if (!input.disabled) {
                    input.style.backgroundColor = '#fff';
                    input.focus();
                } else {
                    input.style.backgroundColor = 'transparent';
                }
            };
        });
    }

    async #handleUpdate(id) {
        const student = new Student(
            this.#codeUpdate.value.trim(),
            this.#nameUpdate.value.trim(),
            this.#genderUpdate.value,
            this.#dateOfBirthUpdate.value,
            this.#classCodeUpdate.value,
            this.#image
        );

        const respone = await this.#controler.handleUpdateStudent(id, student);
        switch (respone.type) {
            case 'success': {
                alert(respone.message);
                break;
            }

            default:
                this.#addDataFormUpdate(respone.data);
                break;
        }
    }

    async #handleDelete(id) {
        const respone = await this.#controler.handleDeleteStudent(id);
        switch (respone.type) {
            case 'success': {
                this.#overlay.style.display = 'none';
                this.#formUpdate.style.display = 'none';
                this.createElement().remove();
                break;
            }

            default:
                alert(respone.message);
                break;
        }
    }

    #addEventButtonDelete(id) {
        this.#btnDelete.onclick = (e) => {
            this.#handleDelete(id);
        };
    }

    #addEventButtonUpdate(id) {
        this.#btnUpdate.onclick = (e) => {
            this.#handleUpdate(id);
        };
    }

    async #handleViewProfile(id) {
        const { isError, message, data } = await this.#controler.getProfile(id);
        if (isError) {
            alert(message);
        } else {
            if (data) {
                this.#handleActionOverlay('block', 'block');
                this.#addDataFormUpdate(data);
                this.#addEventIconUpdate();
                this.#addEventButtonUpdate(data.id);
                this.#addEventButtonDelete(data.id);
            } else {
                alert('please wait');
            }
        }
    }
}
