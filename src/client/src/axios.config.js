import axios from 'axios'
import Cookies from 'js-cookie'
import JWT from 'jsonwebtoken'



const API = axios.create({
  // baseURL: "https://vast-oasis-18718.herokuapp.com/",
    baseURL: "http://localhost:3001/",
    withCredentials: true
})


API.interceptors.request.use(function (config)  {

  if (Cookies.get('authToken')) {
  config.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken')}`
  }
  return config

})


API.interceptors.response.use(function (response) {

  
  let token = response.data.token 

  Cookies.set('authToken', token, { expires: 1/24 })

  return response 

}
)

export default API