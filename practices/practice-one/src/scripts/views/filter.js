import { querySelector } from '../index.js';
import Controllers from '../controllers/index.js';
import Student from '../models/students.js';

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

    async #handleSubmit(student) {
        const { isError, error, type } = await this.#controller.handleAdd(
            student
        );
        // remove all class error
        for (const [key, value] of Object.entries(student)) {
            querySelector(`[name=${key}`).parentNode.classList.remove('error');
        }
        if (!isError) {
            alert('Add successful');
            this.#formAdd.style.display = 'none';
            this.#overlay.style.display = 'none';
        } else {
            if (type) {
                alert('Student ID already exists');
            } else {
                for (const [key, value] of Object.entries(error)) {
                    const element = querySelector(`[name=${key}`).parentNode;
                    element.setAttribute('message', value);
                    element.classList.add('error');
                }
            }
        }
    }

    #submitForm() {
        this.#submitBtn.addEventListener('click', (e) => {
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
