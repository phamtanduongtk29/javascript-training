import { axiosClient } from '../index.js';

export default class Controllers {
    constructor() {}

    async handleAdd(student) {
        let validate = true;
        let error = {};
        for (const [key, value] of Object.entries(student)) {
            // check null or empty string value
            if (value === '' || value === null || !value) {
                error = {
                    ...error,
                    [key]: 'Please fill in this field',
                };
                validate = false;
                // check key code  is number
            } else if (key === 'code') {
                if (isNaN(value)) {
                    validate = false;
                    error = {
                        ...error,
                        [key]: 'Code is not a number',
                    };
                } else if (value.length < 10 || value.length > 10) {
                    validate = false;
                    error = {
                        ...error,
                        [key]: 'The code must be 10 characters',
                    };
                }
            }
        }
        console.log(validate);
        // valid data
        if (validate) {
            const { code } = student;
            const result = await axiosClient.get(
                `${process.env.URL}/students?code=${code}`
            );
            // check if the student exists or not
            if (result.length) {
                return {
                    isError: true,
                    type: 'unique',
                };
            } else {
                axiosClient.post(`${process.env.URL}/students`, student);
            }
        }
        return {
            isError: !validate,
            error,
        };
    }
}
