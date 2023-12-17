import axios from 'axios'

const apiUrl = 'https://api.github.com/users/'

const gitData = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}`)

    return response.data
}

const gitRepo = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}/repos`)

    return response.data
}

const gitFollower = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}/followers`)

    return response.data
}

const gitFollowing = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}/following`)

    return response.data
}

const githubService = {gitData, gitRepo, gitFollower, gitFollowing}

export default githubService