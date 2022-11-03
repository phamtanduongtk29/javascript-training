import Service from '../services/axios.js';

export default class Filter {
    constructor() {}

    /**
     *
     * @param {String} value value to look for
     * @returns Object
     */
    async handleSearch(value) {
        try {
            const service = new Service('GET');
            const respone = await service.request();
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
