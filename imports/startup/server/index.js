// Import server startup through a single index entry point
import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import './accounts.js';
import './fixtures.js';
import './register-api.js';
Meteor.startup(() => {


    var sessionPurgeInterval = 1 * 60 * 1000; // 1 min
    var inactivityTimeout = 15 * 60 * 1000; // 15 mins

    Meteor.setInterval(() => {
        var now = Date.now();
        var overdueTimestamp = now - inactivityTimeout;

        Meteor.users.update({
            heartbeat: { $lt: overdueTimestamp },
        }, {
            $set: { 'services.resume.loginTokens': [] },
            $unset: { heartbeat: 1 }
        }, { multi: true });
    }, sessionPurgeInterval);

    UploadFS.config.storesPath = 'uploads';
});