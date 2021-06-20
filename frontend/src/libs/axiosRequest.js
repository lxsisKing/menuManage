import axios from 'axios'
import {
    Message
} from 'element-ui'

axios.defaults.withCredentials = true; //配置为true


class HttpRequest {
    constructor(baseURL = baseURL) {
        this.baseURL = baseURL
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            headers: {

            },
            timeout: 10000
        };
        return config
    }

    interceptors(instance) {
        instance.interceptors.request.use(
            config => {
                return config
            },
            error => {
                return Promise.reject(error)
            }
        );
        instance.interceptors.response.use(
            res => {
                // 以获取response
                const {
                    data,
                    status
                } = res;
                if (status !== 200) {
                    Message({
                        message: res.message || `错误.code${data.code}`,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                return {data, status}
            },
            error => {
                if (axios.isCancel(error)) {
                    return new Promise(() => {})
                }
                if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    Message({
                        message: '请求超时',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                switch (error.response.status) {
                    case 400:
                        error.message = error.response.data.message
                        break;
                    case 401:
                        // 未授权情况下重定向到登录页
                        break;
                    case 403:
                        error.message = '拒绝访问';
                        break
                    case 404:
                        error.message = '请求地址出错';
                        break;
                    case 501:
                        error.message = '服务未实现';
                        break
                    case 502:
                        error.message = '网关错误';
                        break
                    case 503:
                        error.message = '服务不可用';
                        break
                    case 504:
                        error.message = '网关超时';
                        break
                    case 505:
                        error.message = 'Http版本不受支持'
                        break;
                    default:
                        error.message = error.response.data.message
                        break;
                }
                Message({
                    message: error.message || '服务器出错了',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(error)
            }
        )
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance)
        return instance(options)
    }
}

export default HttpRequest