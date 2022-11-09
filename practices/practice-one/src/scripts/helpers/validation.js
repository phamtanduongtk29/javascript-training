import { sendRequest } from '../services/axios.js';
import messages from '../constants/messages.js';

export default class Validate {
    constructor() {}

    /**
     * Check if the data fields are empty
     * @param {Object} value value to validate empty
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
     */
    async validateCode(code, currentID) {
        const respone = await sendRequest({
            method: 'GET',
            endpoint: `/students?code=${code}`,
        });
        const length = respone.data.length;
        const id = length && respone.data[0].id;
        const codeLength = code.length;
        let valid = {};
        if (!Boolean(code)) {
            valid = { code: messages.EMPTY_MESSAGE };
        } else {
            if (length && id !== currentID) {
                valid = { code: messages.EXISTENCE_MESSAGE };
            } else if (isNaN(code) || codeLength !== 5) {
                valid = { code: messages.NAN_MESSAGE };
            }
        }
        return valid;
    }
}
