import Service from '../services/axios.js';
import Validate from '../helpers/validate.js';
export default class Controller {
    #service;
    #validate;
    constructor() {
        this.#service = new Service();
        this.#validate = new Validate();
    }

    /**
     * 
     * @returns Object {
                isError: true/false,
                message: '...',
                data: array,
            };
     */
    async getStudents() {
        try {
            const data = (await this.#service.request()).data.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
            }));
            return {
                isError: false,
                message: 'success',
                data,
            };
        } catch (error) {
            return {
                isError: true,
                message: 'Can not get student',
                data: [],
            };
        }
    }

    async #handleValidate(student, id = 0) {
        let emptyField = this.#validate.validationEmpty(student);
        const isValidCode = await this.#validate.validateCode(student.code);

        return {
            ...emptyField,
            ...isValidCode,
        };
    }

    /**
     *
     * @param {Object} student class Student()
     * @returns Ojbject {
     *  type:'...',
     * message:' ',
     * student: {
     *  ...
     * }
     * }
     */
    async handleAddStudent(student) {
        try {
            const emptyField = await this.#handleValidate(student);

            const emptyFieldLength = Object.keys(emptyField).length;

            const respone = emptyFieldLength
                ? {
                      type: 'require',
                      emptyField,
                  }
                : await (async () => {
                      this.#service.setPayload(student);
                      this.#service.setAction('POST');
                      const data = (await this.#service.request()).data;
                      const dataLength = Object.keys(data).length;
                      return dataLength
                          ? {
                                type: 'success',
                                message: 'Add success',
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
                type: 'error',
                message: 'Can not submit form',
            };
        }
    }

    /**
     * 
     * @param {String} id id current select
     * @returns Object {
                isError: ...,
                message: '..',
                data:...,
            };
     */
    async getProfile(id) {
        try {
            const service = new Service('GET', id);
            this.#service.setSlug(id);
            const data = (await service.request()).data;
            return {
                isError: false,
                message: 'success',
                data,
            };
        } catch (error) {
            return {
                isError: true,
                message: 'Can not get student',
                data: {},
            };
        }
    }

    /**
     * 
     *  @param {String} id id current select
     *  @param {Object} student New student information
     * @returns Object {
                    type: '...',
                    message: '...',
                    emptyField,
                };
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
                      type: 'error',
                      message: 'can not update student',
                      emptyField,
                  }
                : await (async () => {
                      this.#service.setAction('PUT');
                      this.#service.setSlug(id);
                      this.#service.setPayload(student.getStudent());
                      const data = await this.#service.request();
                      return data.type === 'success'
                          ? {
                                type: 'success',
                                message: 'Update student successfully',
                                emptyField,
                            }
                          : {};
                  })();

            return respone;
        } catch (error) {}
    }

    /**
     * 
     * @param {String} id current id
     * @returns Object {
                type: '....',
                message: '....',
            };
     */
    async handleDeleteStudent(id) {
        try {
            this.#service.setSlug(id);
            this.#service.setAction('DELETE');
            await this.#service.request();
            return {
                type: 'success',
                message: 'Delete student successfully',
            };
        } catch (error) {
            return {
                type: 'error',
                message: 'Can not delete',
            };
        }
    }
}
