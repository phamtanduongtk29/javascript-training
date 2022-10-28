import { querySelector } from '../index.js';

import Student from '../models/students.js';

export default class FillterView {
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

    #handleToggleForm() {
        this.#btnAdd.addEventListener('click', (e) => {
            this.#overlay.style.display = 'block';
            this.#formAdd.style.display = 'flex';
        });

        this.#btnClose.addEventListener('click', (e) => {
            this.#overlay.style.display = 'none';
            this.#formAdd.style.display = 'none';
        });

        this.#overlay.addEventListener('click', (e) => {
            this.#overlay.style.display = 'none';
            this.#formAdd.style.display = 'none';
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

    #handleSubmit() {}

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
        });
    }
}
