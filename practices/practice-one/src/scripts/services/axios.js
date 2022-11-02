import { axiosClient } from '../helpers/utils.js';

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
            if (this.#action === 'GET') {
                data = await axiosClient.get(url);
            } else if (this.#action === 'POST') {
                data = await axiosClient.post(url, this.#payload);
            } else if (this.#action === 'PUT') {
                data = await axiosClient.put(url, this.#payload);
            } else if (this.#action === 'DELETE') {
                data = await axiosClient.delete(url);
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
