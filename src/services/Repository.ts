import {CreateAxiosDefaults, default as axios} from "axios";
import {TokenService} from "./token";
import {get} from "lodash";
import {AxiosInstance} from "axios/index";

const baseUrl = import.meta.env.VITE_APP_API;
console.log({baseUrl})
const options: CreateAxiosDefaults = {
  baseURL: baseUrl
}
// if (TokenService.getToken() !== null) {
//   options.headers = {
//     Authorization: `Bearer ${TokenService.getToken()}`,
//     Language: get(TokenService.getLang(), '', 'en'),
//     "Content-type": "application/json"
//   }
// }

const axiosInstance: AxiosInstance = axios.create(options)
const STATUS_UNAUTHORIZED = 401
const STATUS_TOKEN_EXPIRED = 402
const STATUS_CODE_FORBIDDEN = 403
const STATUS_SUCCESS = 200
const STATUS_INTERNAL_SERVER_ERROR = 500

axiosInstance.interceptors.response.use(
  async (response): Promise<any> => {
    const statusCode = get(response, 'data.code', STATUS_INTERNAL_SERVER_ERROR)
    if (statusCode === STATUS_SUCCESS) {
      return {
        success: true,
        data: get(response, 'data.data', []),
        pagination: get(response, 'data.pagination', {}),
        currentTime: get(response, 'data.time_current', null) ,
        totalItem: get(response, 'data.totalItem', null) || get(response, 'data.pagination.totalElements', null),
        message: get(response, 'data.message', null)
      }
    }
    return {
      error: true,
      message: get(response, 'data.message', ''),
      status: get(response, 'data.code', STATUS_INTERNAL_SERVER_ERROR),
      errors: get(response, 'data.errors', []),
      data: get(response,'data.data',[])
    }
  },

  async (error) => {
    if (STATUS_UNAUTHORIZED === error.response.status || STATUS_TOKEN_EXPIRED == error.response.status) {
      window.location.href = '/login';
    } else {
      return Promise.reject(error);
    }
  }
  ,
)

export default axiosInstance;
