import { querySelector, querySelectorAll } from '../helpers/index.js';
import handleButtonSendRequest from '../helpers/handle-button.js';

import Controller from '../controllers/student.controller.js';
import Filter from '../controllers/filter.controller.js';
import Student from '../models/students.model.js';
import StudentItemView from './student-item.view.js';
import StudentView from './student.view.js';

export default class FillterView {
    #controller;
    #studentView;
    #filterController;

    #overlay;
    #formAdd;
    #formUpdate;

    #searchBtn;
    #btnAdd;
    #btnClose;
    #btnSubmit;

    #name;
    #code;
    #gender;
    #classCode;
    #dateOfBirth;
    #image;

    #ulElement;
    #messageEl;
    #filterSearch;

    constructor() {
        this.#controller = new Controller();
        this.#filterController = new Filter();
        this.#studentView = new StudentView();

        this.#overlay = querySelector('.overlay');
        this.#formAdd = querySelector('.form-add-wrapper');
        this.#formUpdate = querySelector('.form-update-wrapper');

        this.#name = this.#formAdd.querySelector('#name');
        this.#code = this.#formAdd.querySelector('#code');
        this.#gender = this.#formAdd.querySelector('#gender');
        this.#classCode = this.#formAdd.querySelector('#class-code');
        this.#dateOfBirth = this.#formAdd.querySelector('#date-of-birth');
        this.#image = this.#formAdd.querySelector('#image');

        this.#ulElement = querySelector('.students');
        this.#messageEl = querySelector('.message');
        this.#filterSearch = querySelector('.filter-search');

        this.#btnAdd = querySelector('#add-btn');
        this.#btnClose = this.#formAdd.querySelector('.icon-item ion-icon');
        this.#btnSubmit = this.#formAdd.querySelector('.btn');
        this.#searchBtn = querySelector('#search-btn');
    }

    init() {
        this.#handleToggleForm();
        this.#handleUploadImage();
        this.#addEventSearch();
        this.#submitForm();
    }

    #handleActionOverlay(overlay, addForm) {
        this.#overlay.style.display = overlay;
        this.#formAdd.style.display = addForm;
        this.#formUpdate.style.display = 'none';
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

    async #handleSearch() {
        const data = await this.#filterController.handleSearch(
            this.#filterSearch.value.trim().toLowerCase()
        );
        this.#studentView.render(data);
        return data;
    }

    #addEventSearch() {
        let timer = '';

        // apply debounce to search
        this.#filterSearch.addEventListener('input', (e) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                this.#handleSearch();
            }, 600);
        });

        this.#searchBtn.addEventListener('click', (e) => {
            handleButtonSendRequest(e.target, () => {
                return this.#handleSearch();
            });
        });
    }

    async #handleSubmit(student) {
        const respone = await this.#controller.handleAddStudent(student);
        switch (respone.type) {
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
                const { id, name } = respone.student;
                const studentItem = new StudentItemView(id, name);
                this.#ulElement.appendChild(studentItem.createElement());
                this.#messageEl.style.display = 'none';
                this.#handleActionOverlay('none', 'none');
                this.#code.value = '';
                this.#name.value = '';
                this.#dateOfBirth.value = '';
                const label =
                    this.#image.parentElement.querySelector(
                        'label:nth-child(2)'
                    );
                label.style.backgroundImage = 'unset';

                break;
            }
            case 'error': {
                alert(respone.message);
                break;
            }
            default: {
            }
        }
        return respone;
    }

    #submitForm() {
        this.#btnSubmit.addEventListener('click', (e) => {
            const student = new Student(
                this.#code.value.trim(),
                this.#name.value.trim().toLowerCase(),
                this.#gender.value,
                this.#dateOfBirth.value,
                this.#classCode.value,
                this.#image.files.length
            );
            handleButtonSendRequest(e.target, () => {
                return this.#handleSubmit(student.getStudent());
            });
        });
    }
}
