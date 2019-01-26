let googleAuthConfig = {
    clientID: '865538622102-s2h3194vt7nlk789msp0mgi9g5gpgmoa.apps.googleusercontent.com',
    clientSecret: 'Lr8F8475ZdC-DO98yBstoCUU',
    callbackURL: process.env.BASE_URL || 'http://localhost:4000/auth/google/callback',
};

let getMongoURI = () => {
    return process.env.MONGODB_URI || "mongodb://localhost:27017/";
}

module.exports = { googleAuthConfig, getMongoURI };