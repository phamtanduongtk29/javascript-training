import { querySelector, querySelectorAll } from '../helpers/utils.js';

import Controller from '../controllers/main-controllers.js';
import Student from '../models/students.js';

export default class FillterView {
    #controller;

    #overlay;
    #formAdd;

    #btnAdd;
    #btnClose;
    #btnSubmit;

    #name;
    #code;
    #gender;
    #classCode;
    #dateOfBirth;
    #image;

    constructor() {
        this.#controller = new Controller();
        this.#overlay = querySelector('.overlay');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#btnAdd = querySelector('#add-btn');
        this.#btnClose = this.#formAdd.querySelector('.icon-item ion-icon');
        this.#name = this.#formAdd.querySelector('#name');
        this.#code = this.#formAdd.querySelector('#code');
        this.#gender = this.#formAdd.querySelector('#gender');
        this.#classCode = this.#formAdd.querySelector('#class-code');
        this.#dateOfBirth = this.#formAdd.querySelector('#date-of-birth');
        this.#image = this.#formAdd.querySelector('#image');
        this.#btnSubmit = this.#formAdd.querySelector('.btn');
    }

    init() {
        this.#handleToggleForm();
        this.#handleUploadImage();
        this.#submitForm();
    }

    #handleActionOverlay(overlay, addForm) {
        this.#overlay.style.display = overlay;
        this.#formAdd.style.display = addForm;
    }

    #handleToggleForm() {
        this.#btnAdd.addEventListener('click', (e) => {
            this.#handleActionOverlay('block', 'flex');
        });

        this.#btnClose.addEventListener('click', (e) => {
            this.#handleActionOverlay('none', 'none');
        });

        this.#overlay.addEventListener('click', (e) => {
            this.#handleActionOverlay('none', 'none');
        });

        this.#formAdd.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    #handleUploadImage() {
        this.#image.addEventListener('change', function (e) {
            const url = URL.createObjectURL(this.files[0]);
            const label =
                this.parentElement.querySelector('label:nth-child(2)');
            label.textContent = '';
            label.style.backgroundImage = `url(${url})`;
        });
    }

    async #handleSubmit(student) {
        const respone = await this.#controller.handleAddStudent(student);
        switch (respone.type) {
            case 'warning': {
                const liElement = this.#code.parentElement;
                liElement.setAttribute('message', respone.message);
                liElement.classList.add('error');
                break;
            }
            case 'require': {
                // remove all error class
                const liElement = querySelectorAll('.form-add-item');
                liElement.forEach((item) => {
                    item.classList.remove('error');
                });

                // apply error class
                for (const [key, value] of Object.entries(respone.emptyField)) {
                    const element = querySelector(
                        `[name=${key}]`
                    ).parentElement;
                    element.setAttribute('message', value);
                    element.classList.add('error');
                }
                break;
            }
            case 'success': {
                alert('Add success');
                break;
            }
            default: {
                alert('Error!!');
            }
        }
    }

    #submitForm() {
        this.#btnSubmit.addEventListener('click', (e) => {
            const student = new Student(
                this.#code.value.trim(),
                this.#name.value.trim(),
                this.#gender.value,
                this.#dateOfBirth.value,
                this.#classCode.value,
                this.#image.files.length
            );
            this.#handleSubmit(student.getStudent());
        });
    }
}
