import {Platform, PixelRatio} from "react-native";
import fetch from 'react-native-fetch-polyfill';

class Api {

    static ga = null;
    static FETCH_TIMEOUT = 10000;

    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    static get(route, auth) {
        return this.xhr(route, null, 'GET', auth);
    }

    static put(route, params, auth) {
        return this.xhr(route, params, 'PUT', auth)
    }

    static put(route, params, auth, headers) {
        return this.xhr(route, params, 'PUT', auth)
    }

    static post(route, params, auth) {
        return this.xhr(route, params, 'POST', auth)
    }

    static delete(route, params, auth) {
        return this.xhr(route, params, 'DELETE', auth)
    }

    static xhr(route, body, verb, auth, retryCount) {

        if (retryCount <= 0) {
            console.warn("Too many attempts with fails on endpoint:" + url);
        }

        const host = 'https://api.gfycat.com/v1';
        const url = `${host}${route}`;
        const newBody = JSON.stringify(body);
        const options = {
            headers: this.headers(),
            method: verb,
            timeout: this.FETCH_TIMEOUT
        };

        if (verb !== 'GET' && verb !== 'DELETE') {
            options['body'] = newBody;
        }

        return fetch(url, options).then((response) => response.json()).catch(err => {
            return this.xhr(route, body, verb, auth, retryCount === undefined ? 5 : retryCount - 1);
        })
            .then(responseJson => {
                return responseJson
            })
    }
}
export default Api