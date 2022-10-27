import { axiosClient } from '../index.js';

export default class Controllers {
    constructor() {}

    async handleAdd(student) {
        const { code, name, image, gender, dateOfBirth, classCode } = student;
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
            } else if (key === 'code' && isNaN(value)) {
                error = {
                    ...error,
                    [key]: 'Code is not a nomber',
                };
                validate = false;
            }
        }
        // valid data
        if (validate) {
            axiosClient.post(`${process.env.URL}/students`, {
                code,
                name,
                image,
                gender,
                dateOfBirth,
                classCode,
            });
        }
        return {
            isError: !validate,
            error,
        };
    }
}
