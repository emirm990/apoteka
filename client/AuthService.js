import axios from "axios";

const loginUrl = "api/login";
const logoutUrl = "api/logout";
class AuthService {
    static login(name, password) {
        return axios.post(loginUrl, {
            name,
            password,
        });
    }

    static logout() {
        return axios.post(logoutUrl);
    }
}
export default AuthService;