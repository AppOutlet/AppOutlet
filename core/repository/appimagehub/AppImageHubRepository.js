const axios = require('axios');

const APPIMAGE_HUB_API = 'https://appimage.github.io/feed.json';

function getApps() {
    return axios.get(APPIMAGE_HUB_API).then((response) => response.data.items);
}

module.exports = {
    APPIMAGE_HUB_API,
    getApps,
};
