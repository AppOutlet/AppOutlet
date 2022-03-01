const axios = require('axios');

const SNAP_STORE_API = 'https://api.snapcraft.io/v2/snaps/find';
const HEADER_SNAP_SERIES = '16';
const HEADER_SNAP_STORE = 'ubuntu';

const config = {
    params: {
        fields: [
            'base',
            'categories',
            'channel',
            'confinement',
            'contact',
            'description',
            'license',
            'media',
            'publisher',
            'store-url',
            'summary',
            'title',
            'type',
            'version',
            'website',
        ],
    },
    headers: {
        'Snap-Device-Series': HEADER_SNAP_SERIES,
        'Snap-Device-Store': HEADER_SNAP_STORE,
    },
};

function getApps(searchCriteria) {
    config.params.q = searchCriteria;
    return axios
        .get(SNAP_STORE_API, config)
        .then((response) => response.results);
}

module.exports = {
    getApps,
};
