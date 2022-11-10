import { sendRequest } from '../services/axios.js';
import messages from '../constants/messages.js';

export default class Validate {
    constructor() {}

    /**
     * Check if the data fields are empty
     * @param {Student} value value to validate empty
     * returns Object
     */
    validationEmpty(value) {
        const empty = {};
        Object.entries(value).forEach(([key, value]) => {
            !Boolean(value) && (empty[key] = messages.EMPTY_MESSAGE);
        });
        return empty;
    }

    /**
     * Check if the code is valid
     * @param {String} code code to check
     * returns Object
     */
    async validateCode(code, currentID) {
        const respone = await sendRequest({
            method: 'GET',
            endpoint: `/students?code=${code}`,
        });
        const length = respone.data.length;
        const id = length && respone.data[0].id;
        const codeLength = code.length;
        if (!Boolean(code)) {
            return { code: messages.EMPTY_MESSAGE };
        }
        if (length && id !== currentID) {
            return { code: messages.EXISTENCE_MESSAGE };
        }
        if (isNaN(code) || codeLength !== 5) {
            return { code: messages.NAN_MESSAGE };
        }
        return {};
    }

    /**
     * Check if special characters exist
     * @param {String} name
     * return Object
     */
    validateText(name) {
        const regex = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
        const isValid = regex.test(name);
        return isValid ? { name: messages.SPECIAL_CHARACTERS_ERROR } : {};
    }
}
