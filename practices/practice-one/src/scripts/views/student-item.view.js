export default class StudentItemView {
    #liElement;

    #id;
    #name;
    #image;
    constructor(id, name, image) {
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
            this.#handleViewProfile();
        });
        return this.#liElement;
    }

    #handleViewProfile(id) {
        console.log(id);
    }
}
