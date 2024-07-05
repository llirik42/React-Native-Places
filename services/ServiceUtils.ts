import axios from "axios";
import ServiceError from "./ServiceError";


export default class ServiceUtils {
    public static async get(url: string, params: Object): Promise<any> {
        return axios.get(url, {params: params})
            .then((result) => result.data)
            .catch((reason) => {
                throw new ServiceError(reason.cause, undefined);
            })
    }
}
