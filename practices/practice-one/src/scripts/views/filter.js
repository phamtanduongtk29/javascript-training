import { querySelector } from '../index.js';
import Controllers from '../controllers/index.js';

export default class FilterView {
    #controller;

    #formAdd;
    #overlay;
    #inputSearch;
    #searchBtn;
    #addBtn;
    #submitBtn;
    #closeIcon;
    #name;
    #gender;
    #classCode;
    #dateOfBirth;
    #code;
    #image;

    constructor() {
        this.#controller = new Controllers();

        this.#inputSearch = querySelector('.filter-search');
        this.#searchBtn = querySelector('#search-btn');
        this.#addBtn = querySelector('#add-btn');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#closeIcon = this.#formAdd.querySelector('.icon-item');
        this.#submitBtn = this.#formAdd.querySelector('.btn');
        this.#overlay = querySelector('.overlay');
        this.#name = querySelector('#name');
        this.#gender = querySelector('#gender');
        this.#classCode = querySelector('#class-code');
        this.#dateOfBirth = querySelector('#date-of-birth');
        this.#code = querySelector('#code');
        this.#image = querySelector('#image');
    }

    // all code will be executed here
    init() {
        this.#eventToggleFormAdd();
        this.#eventChangeImage();
        this.#submitForm();
    }

    // open or close form add student
    #eventToggleFormAdd() {
        // event open when click with add button
        this.#addBtn.addEventListener('click', (e) => {
            this.#formAdd.style.display = 'flex';
            this.#overlay.style.display = 'flex';
        });

        //  event close form when click  with icon close
        this.#closeIcon.addEventListener('click', (e) => {
            this.#formAdd.style.display = 'none';
            this.#overlay.style.display = 'none';
        });

        // prevent form close event on form click
        this.#formAdd.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // event close form when click  with screen
        this.#overlay.addEventListener('click', (e) => {
            this.#formAdd.style.display = 'none';
            this.#overlay.style.display = 'none';
        });
    }

    #eventChangeImage() {
        this.#image.addEventListener('change', (e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            const img =
                this.#image.parentNode.querySelector('label:nth-child(2)');
            img.style.backgroundImage = `url(${url})`;
            img.textContent = '';
        });
    }

    async #handleSubmit(obj) {
        const result = await this.#controller.handleAdd(obj);
        for (const [key, value] of Object.entries(obj)) {
            querySelector(`[name=${key}`).parentNode.classList.remove('error');
        }
        if (!Object.keys(result).length) {
            console.log('Them vao');
        } else {
            for (const [key, value] of Object.entries(result)) {
                querySelector(`[name=${key}`).parentNode.setAttribute(
                    'message',
                    value
                );
                querySelector(`[name=${key}`).parentNode.classList.add('error');
            }
        }
    }

    #submitForm() {
        this.#submitBtn.addEventListener('click', (e) => {
            const obj = {
                name: this.#name.value.trim(),
                gender: this.#gender.value,
                classCode: this.#classCode.value,
                dateOfBirth: this.#dateOfBirth.value,
                code: this.#code.value.trim(),
                image: this.#image.files.length,
            };
            this.#handleSubmit(obj);
        });
    }
}
