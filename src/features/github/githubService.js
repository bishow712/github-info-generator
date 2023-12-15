import axios from 'axios'

const apiUrl = 'https://api.github.com/users/'

const gitData = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}`)

    return response.data
}

const githubService = {gitData}

export default githubService