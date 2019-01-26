'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    let uri = 'mongodb://heroku_szwx2b9z:8hgof8e0ch1md65gktvu0hv2m3@ds129966.mlab.com:29966/heroku_szwx2b9z';
    //let uri = 'mongodb://localhost:27017/social-auth-example';

    var MongoClient = require('mongodb').MongoClient, assert = require('assert');
    // Use connect method to connect to the Server
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var UserSchema = new Schema({
            email: {
                type: String, required: true,
                trim: true, unique: true,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            googleProvider: {
                type: {
                    id: String,
                    token: String
                },
                select: false
            }
        });

        const User = mongoose.model('User', UserSchema);

        db.close();
    });

    var db = mongoose.connect(uri, {useNewUrlParser: true});//.then(() =>  console.log('connection successful')).catch((err) => console.error(err));
    mongoose.set('useCreateIndex', true);

    var UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    mongoose.model('User', UserSchema);

    return db;
};