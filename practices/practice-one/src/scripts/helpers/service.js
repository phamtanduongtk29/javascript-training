import { axiosClient } from './utils.js';

export default class Service {
    #port;
    #action;
    #params;
    #slug;
    #payload;

    constructor(action = 'GET', slug = '', params = {}, payload = {}) {
        this.#port = process.env.URL;
        this.setAction(action);
        this.setParams(params);
        this.setSlug(slug);
        this.setPayload(payload);
    }

    getPorts() {
        return this.#port;
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
        this.#slug = '/' + slug;
    }

    setParams(params) {
        if (Object.keys(params).length) {
            Object.entries(params).forEach(([key, value], index) => {
                if (index !== 0) {
                    this.#params += `&${key}=${value}`;
                }
                this.#params += `?${key}=${value}`;
            });
        } else this.#params = '';
    }

    setPayload(payload) {
        this.#payload = payload;
    }

    async request() {
        try {
            const url = this.#port + '/students' + this.#slug + this.#params;
            console.log(url);
            switch (this.#action) {
                case 'GET': {
                    const data = await axiosClient(url);
                    return data;
                }

                case 'POST': {
                    return;
                }
                case 'PUT': {
                    return;
                }
                case 'DELETE': {
                    return;
                }

                default: {
                    return {
                        type: 'error',
                        message: 'Can not find action',
                    };
                }
            }
        } catch (error) {
            return {
                type: 'error',
                message: 'Can not call ' + this.#action + ' request',
            };
        }
    }
}
