import axios from 'axios'
import Vue from 'vue'
import API from './API/loginApi.js'

export const httpGet = (url, params, token) => {
  const authorization = token ? token : sessionStorage.getItem('Authorization')
  let keys = Object.keys(params)
  let str = ''
  for (let i = 0; i < keys.length; i++) {
    if (params[keys[i]] instanceof Array) {
      params[keys[i]].forEach(item => {
        str += `${keys[i]}=${item}&`
      })
    } else {
      str += `${keys[i]}=${params[keys[i]]}&`
    }
  }
  str = str.substr(0, str.length - 1)
  return axios({
    url: API[url] + '?' + str,
    method: 'get',
    headers: {
      // 'Authorization': ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6Ind4NmYyOTgzNzQ3NmMzZjBhMiIsInBlcnNvbmlkIjoiNDAyODg4NzM1YzM5NjA0MTAxNWMzZTY5NWVlMDAwNjQiLCJyb2xlcyI6eyI0MDI4ODY4NDVlY2M3YmJiMDE1ZjFmMGIzZTljMDA3NSI6IlNUVURFTlQiLCI0MDI4ODY4NDVlY2M3YmJiMDE1ZjFmMGIzZWNkMDA3NyI6IkdVQVJESUFOIiwiNDAyODg2ODQ2MmE5OGU4NjAxNjUzY2M3MmNiNzAxNzciOiJTTUFOQUdFUiIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2OTVlZTIwMDY2IjoiVEVBQ0hFUiIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2YTk2NzYwMDhjIjoiU1RVREVOVCIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2YTk2ODkwMDhlIjoiR1VBUkRJQU4ifSwiYXVkIjoid3giLCJleHAiOjE1NjY1NTMyNDgsImlhdCI6MTU2NTk0ODQ0OCwiaXNzIjoid3gucGtnIiwibmJmIjoxNTY1OTQ4NDQ4LCJzdWIiOiJvMjJRSDFuRTIxbjRoazNlMDNEbjNDNTI5M3BJIn0.yWloFjSN9Jx4gxetwF4ln7bQzkA4nV6BnuUytPEm-RE',
      // 'X-ROLE': '43378d38e6d246bab5b9ec7d718ad061.TEACHER'
      'api-token': sessionStorage.getItem('Authorization')
      // 'X-ROLE': sessionStorage.getItem('XROLE')
    }
  })
}

export const httpPost = (url, params, token) => {
  axios.defaults.baseURL = '/cross/'

  return axios({
    url: API[url],
    method: 'post',
    data: {
      ...params
    },
    headers: {
      'api-token': sessionStorage.getItem('Authorization')
    }
  })
}

// axios 全局配置
// axios.defaults.baseURL = Host
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
const devTimeout = 10000
const proTimeout = 30000
axios.defaults.timeout =
  process.env.NODE_ENV === 'development' ? devTimeout : proTimeout
axios.defaults.transformRequest = [
  data => {
    return JSON.stringify(data)
  }
]
axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
