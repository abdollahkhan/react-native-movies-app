import axios from 'axios'
import { API_KEY, API_URL } from './lib/constants'

export default axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY
  },
  headers: {
    'Content-type': 'application/json'
  }
})
