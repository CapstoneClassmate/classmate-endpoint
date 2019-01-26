'use strict';

require('./mongoose')();
var passport = require('passport');
var User = require('mongoose').model('User');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config');

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuthConfig.clientID,
            clientSecret: config.googleAuthConfig.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};