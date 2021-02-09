const FLATHUB_API = 'https://flathub.org/api/v1/apps';

const mockAppDetail = {
    flatpakAppId: '123123',
    name: 'Mock application',
};

const mockAppDetailResponse = {
    data: mockAppDetail,
};

const mockApps = [mockAppDetail];

const mockAppsResponse = {
    data: mockApps,
};

function get(url) {
    if (url === FLATHUB_API) {
        return Promise.resolve(mockAppsResponse);
    }

    if (url === `${FLATHUB_API}/${mockAppDetail.flatpakAppId}`) {
        return Promise.resolve(mockAppDetailResponse);
    }
}

module.exports = {
    mockAppDetail,
    mockApps,
    get: get,
};
