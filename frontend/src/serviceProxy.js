import axios from 'axios'

export const makeRequest = () => {
    axios.create()
}

const http = axios.create({
  baseURL: 'https://orderfoodonline.deno.dev/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
});

export const get = (url) => http.get(url, {})

export const post = (url, data) => http.post(url, data)