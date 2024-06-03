import axios from "axios";


export const getMainImage = (sid: string) => {
    return axios.get("http://127.0.0.1:8001/api/v1/food_images/" + sid)
        .then(resp => resp.data)
}