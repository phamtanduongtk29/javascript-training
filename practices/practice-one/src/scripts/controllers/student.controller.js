import { axiosClient } from '../helpers/utils.js';
import Service from '../services/axios.js';
export default class Controller {
    #service;
    constructor() {
        this.#service = new Service();
    }

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
        let emptyField = {};
        // Check if any field is empty
        for (const [key, value] of Object.entries(student)) {
            if (value === '' || value === null || value === undefined) {
                emptyField = {
                    ...emptyField,
                    [key]: "Can't be left blank",
                };
                // check code is number and length by 5
            } else if (key === 'code') {
                if (isNaN(value)) {
                    emptyField = {
                        ...emptyField,
                        [key]: 'Please enter the number',
                    };
                } else {
                    if (value.length < 5 || value.length > 5) {
                        emptyField = {
                            ...emptyField,
                            [key]: 'Please enter 5 numbers',
                        };
                    } else {
                        const service = new Service('GET', '', {
                            code: student.code,
                        });
                        const students = (await service.request()).data;
                        if (students.length && id !== students[0].id) {
                            emptyField = {
                                ...emptyField,
                                code: 'Student ID already exists',
                            };
                        }
                    }
                }
            }
        }
        return emptyField;
    }

    async handleAddStudent(student) {
        try {
            const { code } = student;
            const emptyField = await this.#handleValidate(student);

            if (Object.keys(emptyField).length) {
                return {
                    type: 'require',
                    emptyField,
                };
            } else {
                this.#service.setPayload(student);
                this.#service.setAction('POST');
                const data = (await this.#service.request()).data;
                if (Object.keys(data).length) {
                    return {
                        type: 'success',
                        message: 'Add success',
                        student: {
                            id: data.id,
                            name: data.name,
                            image: data.image,
                        },
                    };
                }
                return {};
            }
        } catch (error) {
            return {
                type: 'error',
                message: 'Can not submit form',
            };
        }
    }

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

    async handleUpdateStudent(id, student) {
        try {
            const emptyField = await this.#handleValidate(
                student.getStudent(),
                id
            );
            if (Object.keys(emptyField).length) {
                return {
                    type: 'error',
                    message: 'can not update student',
                    emptyField,
                };
            } else {
                this.#service.setAction('PUT');
                this.#service.setSlug(id);
                this.#service.setPayload(student.getStudent());
                const data = await this.#service.request();
                if (data.type === 'error') {
                    return {};
                }
                return {
                    type: 'success',
                    message: 'Update student successfully',
                    emptyField: {},
                };
            }
        } catch (error) {}
    }

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

    async handleSearch(value) {
        try {
            this.#service.setAction('GET');
            this.#service.setParams('');
            this.#service.getPayload({});
            this.#service.setSlug('');
            const respone = await this.#service.request();
            if (respone.isError) {
                return respone;
            } else {
                const data = respone.data.filter((student) => {
                    return (
                        student.code.includes(value) ||
                        student.name.includes(value)
                    );
                });
                return {
                    ...respone,
                    data: data,
                };
            }
        } catch (error) {}
    }
}
