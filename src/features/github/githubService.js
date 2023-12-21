import axios from 'axios'

const apiUrl = 'https://api.github.com/users/'
// const langUrl = 'https://api.github.com/repos/'

const gitData = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}`)

    return response.data
}

// const gitRepo = async (idName) => {
//     const response = await axios.get(apiUrl+`${idName}/repos`)

//     return response.data
// }

const gitRepo = async (idName) => {
    try {
        const response = await axios.get(apiUrl + `${idName}/repos`);

        // Use Promise.all to wait for all language requests to complete
        const repositoriesWithLanguages = await Promise.all(
            response.data.map(async (item) => {
                const langResponse = await axios.get(item.languages_url);
                item.language = langResponse.data;
                return item;
            })
        );

        // console.log(repositoriesWithLanguages);

        return repositoriesWithLanguages;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

const gitFollower = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}/followers`)

    return response.data
}

const gitFollowing = async (idName) => {
    const response = await axios.get(apiUrl+`${idName}/following`)

    return response.data
}


// const repoLanguage = async ([idName, name]) => {
//     const response = await axios.get(langUrl+`${idName}/${name}/languages`)
//     response.data.repoName = name
//     console.log(response)

//     return response.data
// }

const githubService = {gitData, gitRepo, gitFollower, gitFollowing}

export default githubService