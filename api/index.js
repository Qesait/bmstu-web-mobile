import axios from 'axios';

const ip = '192.168.1.3'
const apiPort = '8080'
const imagesPort = '9000'

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api` });

export const imageBaseURL = `http://${ip}:${imagesPort}/images`