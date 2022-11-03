import { axiosClient } from '../helpers/index.js';

export default class Service {
    #port;
    #action;
    #params;
    #slug;
    #payload;

    /**
     *
     * @param {String} action upercase string (GET, POST, PUT, DELETE)
     * @param {String} slug  path children (/api)
     * @param {Object} params the transport value on the path
     * @param {Object} payload values ​​to send
     */
    constructor(action = 'GET', slug = '', params = {}, payload = {}) {
        this.#port = process.env.URL;
        this.setAction(action);
        this.setParams(params);
        this.setSlug(slug);
        this.setPayload(payload);
    }

    getAction() {
        return this.#action;
    }

    getSlug() {
        return this.#slug;
    }

    getParams() {
        return this.#params;
    }

    getPayload() {
        return this.#payload;
    }

    setAction(action) {
        this.#action = action;
    }

    setSlug(slug) {
        this.#slug = slug ? '/' + slug : '';
    }

    setParams(params) {
        this.#params = '';
        if (Object.keys(params).length) {
            Object.entries(params).forEach(([key, value], index) => {
                if (index !== 0) {
                    this.#params += `&${key}=${value}`;
                } else this.#params += `?${key}=${value}`;
            });
        } else this.#params = '';
    }

    setPayload(payload) {
        this.#payload = payload;
    }

    async request() {
        try {
            const url = this.#port + '/students' + this.#slug + this.#params;
            let data = {};
            switch (this.#action) {
                case 'POST': {
                    data = await axiosClient.post(url, this.#payload);
                    break;
                }
                case 'PUT': {
                    data = await axiosClient.put(url, this.#payload);
                    break;
                }
                case 'DELETE': {
                    data = await axiosClient.delete(url);
                    break;
                }

                default: {
                    data = await axiosClient.get(url);
                    break;
                }
            }
            return {
                type: 'success',
                message: 'Call ' + this.#action + ' request success',
                data,
            };
        } catch (error) {
            return {
                type: 'error',
                message: 'Can not call ' + this.#action + ' request',
                data: {},
            };
        }
    }
}

new Service();
