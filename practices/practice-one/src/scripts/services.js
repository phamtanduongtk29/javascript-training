import { axiosClient } from './index.js';

export default class Service {
    #url;
    constructor(url) {
        this.#url = url;
    }

    get() {}

    post() {}

    put() {}

    delete() {}
}
