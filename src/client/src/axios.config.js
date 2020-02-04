import axios from 'axios'



const API = axios.create({
    baseURL: "http://localhost:3001/"
    // baseURL: "https://vast-oasis-18718.herokuapp.com/"
})

let token = localStorage.getItem('authToken')

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API