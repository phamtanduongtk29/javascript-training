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

    getCode() {
        return this.#code;
    }

    getName() {
        return this.#name;
    }

    getGender() {
        return this.#gender;
    }

    getDateOfBirth() {
        return this.#dateOfBirth;
    }

    getClassCode() {
        return this.#classCode;
    }

    getImage() {
        return this.#image;
    }

    setCode(code) {
        this.#code = code;
    }

    setName(name) {
        this.#name = name;
    }

    setGender(gender) {
        this.#gender = gender;
    }

    setDateOfBirth(dateOfBirth) {
        this.#dateOfBirth = dateOfBirth;
    }

    setClassCode(classCode) {
        this.#classCode = classCode;
    }

    setImage(image) {
        this.#image = image;
    }
}
