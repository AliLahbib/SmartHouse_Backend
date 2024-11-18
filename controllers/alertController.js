const { User } = require('../models/user');
const alertServices = require('../services/alertServices');

const fetch = require('node-fetch')

exports.addAlert = async (req, res, next) => {

    try {
        const user = await User.findById(req.body.userId);
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AAAAyg5U0Gs:APA91bEO-tCCYlnVhaBDs4jtSpZUrmA-oy-5dCJzL5sYW7YUc-Tv6G2X6Yql6pRAcDOneMUxJ4D_NJl7aHLfFVvGM3XAzuNKcdlBRjj6gR3uYMIeqIU7H6_l6F71w9Sur3W-RG_K8rMR',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notification: {
                    title: user.username + " " + req.body.alertType
                },
                registration_ids: ['egVsSQBeQ9K8S_sjo0pkKF:APA91bHT1i1eZuCE0CcE6rWjw6IcdGJWtvFRnnO8JOP48ni6ustfnu4rBFmijuz6OgtFW8puniV9aQ0QobRP_FMvve1MEHIuN1WXDnpEsryAkoVlOiWY_PSVxL1rCOzKp-gHAN9oWA--'],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Handle successful response here
        // For example, you can parse the response JSON if it is returned
        const result = await response.json();
        console.log(result);
    } catch (error) {
        // Handle errors here
        console.error('Error during fetch:', error);
    }
    try {
        const alertData = req.body;
        console.log(alertData);
        const result = await alertServices.addAlert(alertData);
        res.status(201).json(resasyncult);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}
