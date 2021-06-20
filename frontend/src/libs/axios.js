import HttpRequest from "./axiosRequest"
import config from "../config"

let baseURL = ''

if(process.env.NODE_ENV === 'development') {
    baseURL = config.baseURL.dev
} else {
    // process.env.NODE_ENV === 'production'
    baseURL = config.baseURL.prod
}

const axios = new HttpRequest(baseURL)
export default axios