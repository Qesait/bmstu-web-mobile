import axios from 'axios';
import { containers, draft_transportation } from './MockData';

const ip = '192.168.1.9'
const apiPort = '8080'
const imagesPort = '9000'
export const imageBaseURL = `http://${ip}:${imagesPort}/images`
export const imagePlaceholder = require(`../assets/placeholder.jpg`)

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api/`, timeout: 1000 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${imagesPort}/images/`, timeout: 500 });

export async function getAllContainers(filter) {
    let url = 'containers'
    if (filter !== undefined) {
        url += `?type=${filter}`
    }
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => fromMock(filter))
}

function fromMock(filter) {
    let filteredContainers = Array.from(containers.values())
    if (filter !== undefined) {
        let type = filter.toLowerCase()
        filteredContainers = filteredContainers.filter(
            (container) => container.type.toLowerCase().includes(type)
        )
    }
    return { draft_transportation, containers: filteredContainers }
}

export async function getContainer(containerId) {
    if (containerId === undefined) {
        return undefined
    }
    let url = 'containers/' + containerId
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => containers.get(containerId))
}

export function ReplaceIP(oldURL) {
    if (!oldURL) {
        return ''
    }
    console.log(oldURL.replace("localhost", ip))
    let updatedURL = oldURL.replace("localhost", ip);
    console.log(oldURL, "->", updatedURL, ip)
    return updatedURL;
}