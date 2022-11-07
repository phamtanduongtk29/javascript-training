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
        });
        return {
            type: TYPES.SUCCESS,
            message: 'Call ' + method + ' request success',
            data: respone,
        };
    } catch (error) {
        return {
            type: TYPES.ERROR,
            message: 'Can not call ' + method + ' request',
            data: {},
        };
    }
}
