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
            const data = (
                await sendRequest({
                    method: 'GET',
                    endpoint: '/students',
                })
            ).data.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
            }));
            return {
                isError: false,
                message: MESSAGE.GET_SUCCESS,
                data,
            };
        } catch (error) {
            return {
                isError: true,
                message: MESSAGE.GET_FAIL,
                data: [],
            };
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
            const respone = emptyFieldLength
                ? {
                      type: TYPE.REQUIRE,
                      emptyField,
                  }
                : await (async () => {
                      const data = (
                          await sendRequest({
                              method: 'POST',
                              endpoint: '/students',
                              data: student,
                          })
                      ).data;
                      const dataLength = Object.keys(data).length;
                      return dataLength
                          ? {
                                type: TYPE.SUCCESS,
                                message: MESSAGE.ADD_SUCCESS,
                                student: {
                                    id: data.id,
                                    name: data.name,
                                    image: data.image,
                                },
                            }
                          : {};
                  })();

            return respone;
        } catch (error) {
            return {
                type: TYPE.ERROR,
                message: MESSAGE.ADD_FAIL,
            };
        }
    }

    /**
     * Get student information
     * @param {String} id id current select
     * @returns Object
     */
    async getProfile(id) {
        try {
            const data = (
                await sendRequest({
                    method: 'GET',
                    endpoint: '/students/' + id,
                })
            ).data;
            return {
                isError: false,
                message: MESSAGE.GET_SUCCESS,
                data,
            };
        } catch (error) {
            return {
                isError: true,
                message: MESSAGE.GET_FAIL,
                data: {},
            };
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
            const respone = isValid
                ? {
                      type: TYPE.REQUIRE,
                      message: '',
                      emptyField,
                  }
                : await (async () => {
                      const data = await sendRequest({
                          method: 'PUT',
                          endpoint: '/students/' + id,
                          data: student.getStudent(),
                      });
                      return data.type === TYPE.SUCCESS
                          ? {
                                type: TYPE.SUCCESS,
                                message: MESSAGE.UPDATE_SUCCESS,
                                emptyField,
                            }
                          : {};
                  })();

            return respone;
        } catch (error) {
            return {
                type: TYPE.ERROR,
                message: MESSAGE.UPDATE_FAIL,
                emptyField,
            };
        }
    }

    /**
     * Delete student
     * @param {String} id current id
     * @returns Object
     */
    async handleDeleteStudent(id) {
        try {
            await sendRequest({
                method: 'DELETE',
                endpoint: '/students/' + id,
            });
            return {
                type: TYPE.SUCCESS,
                message: MESSAGE.DEL_SUCCESS,
            };
        } catch (error) {
            return {
                type: TYPE.ERROR,
                message: MESSAGE.DEL_FAIL,
            };
        }
    }
}
