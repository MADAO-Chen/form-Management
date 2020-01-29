import axios from 'axios'
export function request(config) {
    const  instance = axios.create({
        baseURL:'/api',
        timeout:1000
    })

    instance.interceptors.response.use(res => {
        return res.data
    },error => {
        console.log(error)
    })
    return instance(config)
}