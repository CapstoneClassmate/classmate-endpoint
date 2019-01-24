'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
    let uri = 'mongodb://heroku_szwx2b9z:8hgof8e0ch1md65gktvu0hv2m3@ds129966.mlab.com:29966/heroku_szwx2b9z';

    mongoose.connect(uri, {useNewUrlParser: true});

    //let db = mongoose.connection;

    var db = mongoose.connect(uri, {useNewUrlParser: true});
    mongoose.set('useCreateIndex', true);

    /*db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function callback() {

        // Create song schema
        let songSchema = mongoose.Schema({
            decade: String,
            artist: String,
            song: String,
            weeksAtOne: Number
        });

        // Store song documents in a collection called "songs"
        let Song = mongoose.model('songs', songSchema);

        // Create seed data
        let seventies = new Song({
            decade: '1970s',
            artist: 'Seanathan Debby Boone',
            song: 'You Light Up My Life',
            weeksAtOne: 10
        });

        let eighties = new Song({
            decade: '1980s',
            artist: 'Seanathan Olivia Newton-John',
            song: 'Physical',
            weeksAtOne: 10
        });

        let nineties = new Song({
            decade: '1990s',
            artist: 'Seanathan Mariah Carey',
            song: 'One Sweet Day',
            weeksAtOne: 16
        });

        let list = [seventies, eighties, nineties]

        Song.insertMany(list).then(() => {

            return Song.update({ song: 'One Sweet Day' }, { $set: { artist: 'Mariah Carey ft. Boyz II Men' } })

        }).then(() => {

            return Song.find({ weeksAtOne: { $gte: 10 } }).sort({ decade: 1 })

        }).then(docs => {

            docs.forEach(doc => {
                console.log(
                    'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
                    ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
                );
            });

        }).then(() => {

        }).then(() => {

            // Only close the connection when your app is terminating
            return mongoose.connection.close()

        }).catch(err => {

            // Log any errors that are thrown in the Promise chain
            console.log(err)

        })
    });*/

    let UserSchema = new Schema({
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