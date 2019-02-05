let googleAuthConfig = {
    clientID: process.env.Google_ClientID || '865538622102-s2h3194vt7nlk789msp0mgi9g5gpgmoa.apps.googleusercontent.com',
    clientSecret: process.env.Google_Client_Secret || 'Lr8F8475ZdC-DO98yBstoCUU'
};

let getMongoURI = () => {
    return process.env.MONGODB_URI || "mongodb://localhost:27017/";
}

module.exports = { googleAuthConfig, getMongoURI };