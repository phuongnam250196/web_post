import { Http } from "./../../../Helpers/Http";

const API_ENDPOINT = {
    LOGIN_USER: '/auth/auth/sign-in',
}

class LoginService {
    constructor() {
        if (LoginService._instance) {
            return LoginService._instance;
        }
        LoginService._instance = this;
    }



    // login
    loginUser(data) {
        console.log(data)
        return Http.post(API_ENDPOINT.LOGIN_USER, data);
    }




}

const instance = new LoginService();
export default instance;
