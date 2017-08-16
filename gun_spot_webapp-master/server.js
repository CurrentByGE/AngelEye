var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cityIQRest = require('./controllers/cityIQ_rest');
var webToken = require('./controllers/webToken');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'html')   // use .html extension for templates 
app.set('layout', 'index')      // use index.html as the default layout 
app.enable('view cache')
app.engine('html', require('hogan-express'))

var port = process.env.PORT || 9001;

// ROUTES FOR OUR API
// ==============================================
var router = express.Router();
var gunDetector = require('./controllers/gunDetector')(router);
var drunkDetector = require('./controllers/drunkDetector')(router);

// middleware that logs all requests
router.use(function(req, res, next){
	//Allow Cross Origin Resource Sharing
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");

	// go to the next route!
	next();
});

router.get('/', function(req, res) {
   res.render('main')
});

router.get('/firearm', function(req, res){
	res.render('firearm')
});

router.get('/analytics', function(req, res){
	res.render('analytics')
});

router.get('/drunk_driving', function(req, res){
	res.render('drunk_driving')
});

router.get('/about', function(req, res){
	res.render('about')
});

router.get('/drunk', function(req, res){
	res.render('drunk_incident')
});

router.get('/gun', function(req, res){
	res.render('gun_incident')
});





// REGISTER OUR ROUTES
// ==============================================
app.use('/', router);

/*
* Get a web token and establish web socket support for live data streaming
*/
webToken.getToken(function(token){

	cityIQRest.getPedestrianData(token, '32.715675:-117.161230,32.708498:-117.151681', 1499712983000, 1499714983000, function(result){
		//console.log(result.content[0]);
	});
});

app.listen(port);
console.log('Magic happens on port ' + port);