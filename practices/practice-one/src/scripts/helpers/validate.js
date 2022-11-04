import Service from '../services/axios.js';

export default class Validate {
    constructor() {}

    /**
     * Check if the data fields are empty
     * @param {Object} value value to validate empty
     */
    validationEmpty(value) {
        const empty = {};
        Object.entries(value).forEach(([key, value]) => {
            !Boolean(value) && (empty[key] = "Can't be left blank");
        });
        return empty;
    }

    /**
     * Check if the code is valid
     * @param {String} code code to check
     */
    async validateCode(code) {
        const service = new Service();
        service.setParams({
            code,
        });
        const respone = await service.request();
        const length = respone.data.length;
        const codeLength = code.length;
        const valid = !Boolean(code)
            ? { code: "Can't be left blank" }
            : length
            ? { code: 'Student ID already exists' }
            : isNaN(code) || codeLength < 5 || codeLength > 5
            ? {
                  code: '5 characters and is a number',
              }
            : {};
        return valid;
    }
}
