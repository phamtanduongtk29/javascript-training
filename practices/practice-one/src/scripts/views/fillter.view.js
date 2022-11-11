import { querySelector, querySelectorAll } from '../helpers/index.js';
import { preventSpam } from '../helpers/event-validation.js';
import TYPE from '../constants/types.js';

import { handleCleanData } from '../helpers/format-data.js';
import { loading, removeErrorOverlay } from '../helpers/dom.js';

import Filter from '../controllers/filter.controller.js';
import Student from '../models/students.model.js';
import StudentItemView from './student-item.view.js';

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
    #liElements;

    constructor(controller, app) {
        this.#controller = controller;
        this.#filterController = new Filter();
        this.#studentView = app;

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
        this.#liElements = querySelectorAll('.form-add-item');

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

    // change the style of the overlay
    #handleActionOverlay(overlay, addForm) {
        this.#overlay.style.display = overlay;
        this.#formAdd.style.display = addForm;
        this.#formUpdate.style.display = 'none';
        removeErrorOverlay(this.#liElements);
    }

    // add button event  open or close the overlay
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

    // handle event when selecting image
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
        const value = handleCleanData(
            this.#filterSearch.value.trim().toLowerCase(),
            ' '
        );
        const data = await loading(() =>
            this.#filterController.handleSearch(value)
        );
        this.#studentView.render(data);
        return data;
    }

    #addEventSearch() {
        let timer = '';
        // apply preventSpam to search
        this.#filterSearch.addEventListener('input', (e) => {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                this.#handleSearch();
            }, 600);
        });

        preventSpam(this.#searchBtn, () => this.#handleSearch());
    }

    async #handleSubmit(student) {
        const respone = await loading(() =>
            this.#controller.handleAddStudent(student)
        );
        switch (respone.type) {
            case TYPE.REQUIRE: {
                removeErrorOverlay(this.#liElements);
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
            case TYPE.SUCCESS: {
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
            default: {
                alert(respone.message);
                break;
            }
        }
        return respone;
    }

    #submitForm() {
        preventSpam(this.#btnSubmit, () => {
            const name = handleCleanData(
                this.#name.value.trim().toLowerCase(),
                ' '
            );
            const code = this.#code.value.trim();
            const gender = this.#gender.value;
            const dateOfBirth = this.#dateOfBirth.value;
            const classCode = this.#classCode.value;
            const image = this.#image.files.length;
            const student = new Student(
                code,
                name,
                gender,
                dateOfBirth,
                classCode,
                image
            );
            return this.#handleSubmit(student.getStudent());
        });
    }
}
