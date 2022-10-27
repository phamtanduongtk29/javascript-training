export default class Student {
    #code;
    #name;
    #gender;
    #dateOfBirth;
    #classCode;
    #image;
    constructor(code, name, gender, dateOfBirth, classCode, image) {
        this.#code = code;
        this.#name = name;
        this.#gender = gender;
        this.#dateOfBirth = dateOfBirth;
        this.#classCode = classCode;
        this.#image = image;
    }

    getStudent() {
        return {
            code: this.#code,
            name: this.#name,
            gender: this.#gender,
            dateOfBirth: this.#dateOfBirth,
            classCode: this.#classCode,
            image: this.#image,
        };
    }
}
