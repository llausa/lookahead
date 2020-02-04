import axios from 'axios'
import Cookies from 'js-cookie'



const API = axios.create({
  // baseURL: "https://vast-oasis-18718.herokuapp.com/"
    baseURL: "http://localhost:3001/",
    withCredentials: true
})

let token = Cookies.get('authToken')

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API