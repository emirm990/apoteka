import axios from "axios";

const url = "api/new";
class NewItemService {
    static addItem(name, description, price, stock) {
        return axios.post(url, {
            name,
            description,
            price,
            stock
        });
    }
}
export default NewItemService;