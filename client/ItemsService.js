import axios from "axios";

const url = "api/items";

class ItemsService {
    static getItems() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data.items;
                //eslint-disable-next-line no-console
                console.log(data);
                resolve(
                    data.map(items => ({
                        ...items
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default ItemsService;