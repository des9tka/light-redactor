import axios, {AxiosResponse} from "axios";

import {baseURL} from "@/config/urls";

export type AxiosRes<T> = Promise<AxiosResponse<T>>;
export const axiosService = axios.create({
	baseURL,
});
