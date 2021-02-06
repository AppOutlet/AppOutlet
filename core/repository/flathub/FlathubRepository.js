const axios = require('axios');

const FLATHUB_API = 'https://flathub.org/api/v1/apps';

function getApps() {
    return axios.get(FLATHUB_API).then((response) => response.data);
}

function getAppDetails(app) {
    return axios
        .get(`${FLATHUB_API}/${app.flatpakAppId}`)
        .then((response) => response.data);
}

module.exports = {
    getApps,
    getAppDetails,
};
