import axios from "axios";

const url = "api/upload";
class UploadService {
    static uploadPhoto(id, formData) {
        return axios.post(url + "?id=" + id,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    }
    static getPhoto(id) {
        return axios.get(url + "?id=" + id);
    }
}
export default UploadService;