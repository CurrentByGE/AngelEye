var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var cityIQRest = require('./controllers/cityIQ_rest');
var webToken = require('./controllers/webToken')
var cityIQWs = require('./controllers/cityIQ_wss');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9001;

// ROUTES FOR OUR API
// ==============================================
var router = express.Router();

// middleware that logs all requests
router.use(function(req, res, next){
	console.log('Something is happening.');

	//Allow Cross Origin Resource Sharing
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");

	// go to the next route!
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/', function(req, res){
	res.json({message: 'posted'});
});

router.put('/', function(req, res){
	res.json({message: 'putted'});
})

router.delete('/', function(req, res){
	res.json({message: 'deleted'});
})

// REGISTER OUR ROUTES
// ==============================================
app.use('/api', router);

/*
* Get a web token and establish web socket support for live data streaming
*/
webToken.getToken(function(token){

	// cityIQRest.getPedestrianData(token, '32.715675:-117.161230,32.708498:-117.151681', 1499712983000, 1499714983000, function(result){
	// 	console.log(result);
	// });
});

app.listen(port);
console.log('Magic happens on port ' + port);