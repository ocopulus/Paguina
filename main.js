var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongoose');
var tweet = require('./models/tweet').tweet;
/*var Schema = mongo.Schema;

var tweet_schema = new Schema({
	user: String,
	message: String,
	type: String
});

var tweet = mongo.model("tweet", tweet_schema);*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res)=>{
	res.render('index');
});
//35.229.112.63
mongo.connect('mongodb://localhost/cool_db', function(err, db){
	if(err) return;
	console.log('conecto');
	console.log(tweet.find());
	app.listen(8080, function(){
		console.log('Servidor corriendo en http://localhost:8080');
	});
	
});

/*app.listen(8080, function(){
	console.log('Servidor corriendo en http://localhost:8080')
});*/