import axios from "axios";

const url = "api/edit";
class EditService {
    static getItem(id) {
        return axios.get(url + "?id=" + id);
    }
    static saveItem(id, name, description, price, stock) {
        return axios.post(url + "?id=" + id, {
            name,
            description,
            price,
            stock
        });
    }
    static deleteItem(id) {
        return axios.delete(url + "?id=" + id);
    }
}
export default EditService;