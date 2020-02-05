import axios from 'axios'
import Cookies from 'js-cookie'
import JWT from 'jsonwebtoken'



const API = axios.create({
  baseURL: "https://vast-oasis-18718.herokuapp.com/",
    // baseURL: "http://localhost:3001/",
    withCredentials: true
})


API.interceptors.request.use(function(config, request) {

  config.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken')}`
  return config

})

export default API