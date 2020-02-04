import axios from 'axios'
import Cookies from 'js-cookie'



const API = axios.create({
  // baseURL: "https://vast-oasis-18718.herokuapp.com/"
    baseURL: "http://localhost:3001/",
    withCredentials: true
})


LocalAPI.interceptors.request.use(function(config) {
  const authHeader = config.headers.common.Authorization

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]
    const id = JWT.decode(token)._id

    if (!id) {
      if (Cookies.get('authToken')) {
        Cookies.remove('authToken')
      }

    }

    }

  return config
  
})

let token = Cookies.get('authToken')

if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API