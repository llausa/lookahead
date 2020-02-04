import axios from 'axios'
import Cookies from 'js-cookie'



const API = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true
})

let token = Cookies.get('authToken')

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken')}`
}

export default API