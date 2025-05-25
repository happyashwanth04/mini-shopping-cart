import axios from 'axios'

export const makeRequest = () => {
    axios.create()
}

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url) => http.get(url, {})

export const post = (url, data) => http.post(url, data)