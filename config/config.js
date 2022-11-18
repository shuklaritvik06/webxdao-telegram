const axios = require("axios");

module.exports.githubAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: ` Bearer ${process.env.GITHUB_TOKEN}`,
    },
})