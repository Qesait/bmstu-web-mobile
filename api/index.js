import axios from 'axios';
import { containers, draft_transportation } from './MockData';

const ip = '192.168.1.3'
const apiPort = '8080'
const imagesPort = '9000'
export const imageBaseURL = `http://${ip}:${imagesPort}/images`

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api`, timeout: 1000 });

export async function getAllContainers(filter) {
    let url = '/containers'
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
    let url = '/containers/' + containerId
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => containers.get(containerId))
}