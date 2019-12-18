import axios from "axios";

const url = "api/session";
class SessionService {
    static sessionActive() {
        return axios.get(url);
    }
}
export default SessionService;