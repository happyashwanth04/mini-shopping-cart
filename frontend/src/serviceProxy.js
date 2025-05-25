import axios from 'axios'

export const makeRequest = () => {
    axios.create()
}

const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url) => http.get(url, {})

export const post = (url, data) => http.post(url, data)