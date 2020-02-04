import axios from 'axios'



const API = axios.create({
    baseURL: "http://localhost:3001/"
})

let token = localStorage.getItem('authToken')

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API