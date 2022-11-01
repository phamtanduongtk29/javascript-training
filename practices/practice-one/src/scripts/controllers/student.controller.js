import { axiosClient } from '../helpers/utils.js';
import Service from '../helpers/service.js';
export default class Controller {
    #service;
    constructor() {
        this.#service = new Service();
    }

    async getStudents() {
        try {
            this.#service.request();
            const data = (
                await axiosClient.get(`${process.env.URL}/students`)
            ).map((item) => ({
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

    #handleValidate(student) {
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
                    }
                }
            }
        }
        return emptyField;
    }

    async handleAddStudent(student) {
        try {
            const { code } = student;
            const emptyField = this.#handleValidate(student);

            if (Object.keys(emptyField).length) {
                return {
                    type: 'require',
                    emptyField,
                };
            } else {
                const students = await axiosClient.get(
                    `${process.env.URL}/students?code=${code}`
                );

                if (students.length) {
                    return {
                        type: 'warning',
                        message: 'Student ID already exists',
                    };
                } else {
                    const { id, name, image } = await axiosClient.post(
                        `${process.env.URL}/students`,
                        student
                    );
                    return {
                        type: 'success',
                        message: 'Add success',
                        student: {
                            id,
                            name,
                            image,
                        },
                    };
                }
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
            const data = await axiosClient.get(
                `${process.env.URL}/students/${id}`
            );
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

    async handleUpdateStudent(id, student) {
        try {
            const emptyField = this.#handleValidate(student.getStudent());
            if (Object.keys(emptyField).length) {
                const data = await this.getProfile(id);
                return {
                    type: 'error',
                    message: 'can not update student',
                    data: { ...data.data },
                };
            } else {
                axiosClient.put(
                    `${process.env.URL}/students/${id}`,
                    student.getStudent()
                );
                return {
                    type: 'success',
                    message: 'Update student successfully',
                    data: {},
                };
            }
        } catch (error) {}
    }

    async handleDeleteStudent(id) {
        try {
            await axiosClient.delete(`${process.env.URL}/students/${id}`);
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
