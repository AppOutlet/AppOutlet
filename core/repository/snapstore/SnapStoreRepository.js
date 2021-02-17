const axios = require('axios');

const SNAP_STORE_API = 'https://api.snapcraft.io/api/v1/snaps';
const HEADER_UBUNTU_SERIES = '16';
const HEADER_UBUNTU_STORE = 'ubuntu';

const config = {
    headers: {
        'X-Ubuntu-Series': HEADER_UBUNTU_SERIES,
        'X-Ubuntu-Store': HEADER_UBUNTU_STORE,
    },
};

function getApps() {
    return axios
        .get(SNAP_STORE_API, config)
        .then((response) => response.data._embedded['clickindex:package']);
}

module.exports = {
    getApps,
};
