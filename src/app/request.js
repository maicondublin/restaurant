import axios from 'axios'

const createHttpRequest = ({baseURL}) => { // creates instance for server side baseURL
    return axios.create({baseURL})
} 

const request = createHttpRequest({baseURL: process.env.VUE_APP_API_URI})

export default request