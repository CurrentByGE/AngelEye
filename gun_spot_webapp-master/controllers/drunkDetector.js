'use strict';

var notifier = require('node-notifier');
var http = require('http');
var appUrl = 'http://localhost:9001/drunk'

module.exports = function(router){

	router.post('/drunkDetected', function(req, res){
		console.log("A gun was detected.");
		notifier.notify({
			title: "angelEye Alert: Drunk Driver Detected.",
			message: "A drunk driver has been detected. Click to review the video.",
			open: appUrl,
			sound: true,
			wait: true
		});
		res.json({message: 'posted'});
	});

	// event handler for when a notification is clicked on
	notifier.on('click', function(notifierObject, option){
		console.log("Notifier clicked.");
	});

	// event handler for when a notification times out
	notifier.on('timeout', function(notifierObject, option){
		console.log("Notifier timed out.");
	});

};