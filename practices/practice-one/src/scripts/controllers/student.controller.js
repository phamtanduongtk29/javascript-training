import { sendRequest } from '../services/axios.js';

import Validate from '../helpers/validation.js';
import TYPE from '../constants/types.js';
import MESSAGE from '../constants/messages.js';

export default class Controller {
    #validate;
    constructor() {
        this.#validate = new Validate();
    }

    /**
     * Get all student
     * @returns Object
     */
    async getStudents() {
        try {
            const response = await sendRequest({
                method: 'GET',
                endpoint: '/students',
            });
            const data = response.data.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
            }));
            return {
                ...response,
                data,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async #handleValidate(student, id = 0) {
        const emptyField = this.#validate.validationEmpty(student);
        const isValidCode = await this.#validate.validateCode(student.code, id);
        const isValidName = this.#validate.validateText(student.name);
        return {
            ...emptyField,
            ...isValidCode,
            ...isValidName,
        };
    }

    /**
     * Add new student
     * @param {Student} student
     * @returns Object
     */
    async handleAddStudent(student) {
        try {
            const emptyField = await this.#handleValidate(student);
            const emptyFieldLength = Object.keys(emptyField).length;
            if (emptyFieldLength) {
                return {
                    type: TYPE.REQUIRE,
                    emptyField,
                };
            }
            const response = await sendRequest({
                method: 'POST',
                endpoint: '/students',
                data: student,
            });
            const data = response.data;
            const dataLength = Object.keys(data).length;
            let studentTemp = {};
            if (dataLength) {
                studentTemp = {
                    id: data.id,
                    name: data.name,
                    image: data.image,
                };
            }
            return {
                ...response,
                student: studentTemp,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get student information
     * @param {String} id id current select
     * @returns Object
     */
    async getProfile(id) {
        try {
            const response = await sendRequest({
                method: 'GET',
                endpoint: '/students/' + id,
            });
            const data = response.data;
            return {
                ...response,
                data,
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update student information
     *  @param {String} id id current select
     *  @param {Object} student New student information
     * @returns Object
     */
    async handleUpdateStudent(id, student) {
        try {
            const emptyField = await this.#handleValidate(
                student.getStudent(),
                id
            );
            const isValid = Object.keys(emptyField).length;
            if (isValid) {
                return {
                    type: TYPE.REQUIRE,
                    message: '',
                    emptyField,
                };
            }
            const response = await sendRequest({
                method: 'PUT',
                endpoint: '/students/' + id,
                data: student.getStudent(),
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Delete student
     * @param {String} id current id
     * @returns Object
     */
    async handleDeleteStudent(id) {
        try {
            const response = await sendRequest({
                method: 'DELETE',
                endpoint: '/students/' + id,
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}
