import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from '../../ui/containters/MainLayout';

Meteor.startup(() => {
    console.log('session timeout');
    //session timeout
    var heartbeatInterval = 60 * 1000; // 1min
    var activityEvents = 'mousemove click keydown';

    var activityDetected = false;

    Meteor.setInterval(() => {
        if (Meteor.userId() && activityDetected) {
            Meteor.call('heartbeat');
            
            activityDetected = false;
        }
    }, heartbeatInterval);

    $(document).on(activityEvents, () => activityDetected = true);
    // $(document).on(activityEvents, () => { console.log('activity detected'); activityDetected = true });
    // var lastActivityTime = Date.now(),
    //     heartbeatInterval = 30 * 1000, // 30 seconds = 30000 milliseconds
    //     activityEvents = 'mousemove click keydown touchstart';

    // Meteor.setInterval(() => {
    //     if (Meteor.userId()) {
    //         let currentActityTime = Date.now(),
    //             activityDifference = (currentActityTime - lastActivityTime) / 1000, // in seconds
    //             maxInactivityDuration = 60 * 15; // 15 minutes = 900 seconds

    //         if (activityDifference >= maxInactivityDuration) {
    //             Meteor.logout();
    //         }
    //     }
    // }, heartbeatInterval);

    // $(document).on(activityEvents, () => lastActivityTime = Date.now());



    //method for capitalizing strings
    // String.prototype.capitalize = function () {
    //     return this.charAt(0).toUpperCase() + this.slice(1);
    // };
    console.log('MainLayout');
    ReactDOM.render(<MainLayout />, document.getElementById('root'));
});