export default class Controllers {
    constructor() {}

    async handleAdd(student) {
        let validate = true;
        let error = {};
        for (const [key, value] of Object.entries(student)) {
            if (value === '' || value === null || !value) {
                error = {
                    ...error,
                    [key]: 'Please fill in this field',
                };
                validate = false;
            } else if (key === 'code' && isNaN(value)) {
                error = {
                    ...error,
                    [key]: 'Code is not a nomber',
                };
                validate = false;
            }
        }

        return error;
    }
}
