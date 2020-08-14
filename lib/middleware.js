const resourceSearchMiddleware = {
    public_account: item => ({...item, email: 'clark.kent@dailyplanet.com'}),
}

module.exports = resourceSearchMiddleware;