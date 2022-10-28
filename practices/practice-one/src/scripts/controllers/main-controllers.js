import { axiosClient } from '../helpers/utils.js';

export default class Controller {
    constructor() {}

    async getStudents() {
        try {
            const data = await axiosClient.get(`${process.env.URL}/students`);
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

    async handleAddStudent(student) {
        try {
            const { code } = student;
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
                    axiosClient.post(`${process.env.URL}/students`, student);
                    return {
                        type: 'success',
                        message: 'Add success',
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
}
