import { axiosClient } from '../helpers/index.js';
import TYPES from '../constants/types.js';

/**
 *- Call the api to interact with the database.
 *
 *- The passed parameter is an Object with the following properties
 *
 *- (*)Are required attributes
 *  @param {String} method (GET, POST, PUT, DELETE)*
 *  @param {String} endpoint (/api/v1/)*
 *  @param {Object} data Data to be sent
 *  @param {Object} headers Options
 *
 * - The return value is an object with the following properties:
 * @returns  Object
 */
export async function sendRequest({ method, endpoint, data, headers }) {
    try {
        const respone = await axiosClient({
            method,
            baseURL: process.env.URL + endpoint,
            data: data,
            headers,
        })
            .then((response) => {
                return {
                    type: TYPES.SUCCESS,
                    message: 'Call ' + method + ' request success ',
                    data: response.data,
                    status: response.status,
                };
            })
            .catch((error) => {
                if (error.response) {
                    return {
                        type: TYPES.ERROR,
                        message: 'Call ' + method + ' ' + error.message,
                        data: [],
                        status: error.response.status,
                    };
                } else if (error.request) {
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
            });
        return respone;
    } catch (error) {
        throw new Error(error.message);
    }
}
