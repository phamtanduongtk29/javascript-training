import Service from '../services/axios.js';
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
        const service = new Service();
        service.setParams({
            code,
        });
        const respone = await service.request();
        const id = respone.data[0].id;
        const length = respone.data.length;
        const codeLength = code.length;
        const valid = !Boolean(code)
            ? { code: messages.EMPTY_MESSAGE }
            : length && id !== currentID
            ? { code: messages.EXISTENCE_MESSAGE }
            : isNaN(code) || codeLength < 5 || codeLength > 5
            ? {
                  code: messages.NAN_MESSAGE,
              }
            : {};
        return valid;
    }
}
