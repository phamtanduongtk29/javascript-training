import { sendRequest } from '../services/axios.js';

export default class Filter {
    constructor() {}

    /**
     * Search students by name or student code
     * @param {String} value value to look for
     * @returns Object
     */
    async handleSearch(value) {
        try {
            const respone = await sendRequest({
                method: 'GET',
                endpoint: '/students',
            });
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
