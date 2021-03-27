import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { WORK_URL } from '../config/environments'
import LocalStorage from './localstorages'

export const axiosClient = axios.create({ baseURL: WORK_URL })

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = LocalStorage.getToken()
    config.headers['Authorization'] = `Bearer ${token}`
    return config
}, (error) => {

    return Promise.reject(error);
})


axiosClient.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient