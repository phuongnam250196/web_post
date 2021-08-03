import Axios from 'axios';
import { BASE_URL } from './../Constances/const';

export class Http {
    get header() {
        return {
            'X-Refresh': 'refreshToken',
            'Authorization': 'authToken',
            'x-userId': 'userId',
            'Access-Control-Allow-Origin': '*',
        }
    }

    static get = (endPoint, params) => {
        const options = {
            header: this.header,
        }
        if (params && Object.keys(params).length) {
            options.params = params;
        }
        return Axios.get(BASE_URL + endPoint, options);
    }

    static post = (endPoint, payload) => {
        return Axios.post(BASE_URL + endPoint, payload, {
            header: this.header,
        });
    }
}
