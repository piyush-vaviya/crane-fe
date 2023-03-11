import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://sparkling-crow-clothes.cyclic.app/api/v1',
})

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    // console.log(error.response.data.message);
    return Promise.reject(error.response.data)
  }
)

export default axiosInstance
