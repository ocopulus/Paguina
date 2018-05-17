var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongoose');
var tweet = require('./models/tweet').tweet;
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));

app.get('/', (req, res)=>{
	var TotalTweets;
	var TotalUsuarios;
	var TotalCategorias;
	var TotalImagenes;
	tweet.find().distinct('user').count(function(err,docs){
		TotalUsuarios = docs;
		tweet.find().count(function(err,docs){
			TotalTweets = docs;
			tweet.find({type:'Image'}).count(function(err,docs){
				TotalImagenes = docs;
				var contex = {Ttweets: TotalTweets, Tusuaios: TotalUsuarios, Timagenes: TotalImagenes};
				res.render('dash', contex);
			});
		});
	});
});

app.get('/tweets', (req, res)=>{
	res.render('Tweets');
});

app.get('/GetTweets', (req, res)=>{
	tweet.find(function(err, docs){
		res.send(docs);
	});
});

app.get('/GetTweets2', (req, res)=>{
	res.render('BuscarTweets', {datos: []});
});

app.post('/GetTweets2', (req, res)=>{
	palabra = req.body.palabra;
	var regex = new RegExp(palabra, "i")
	tweet.find({$or:[{lista:palabra}, {message:regex}]}).find(function(err,docs){
		res.render('BuscarTweets', {datos: docs});
	});
});

//35.229.112.63
mongo.connect('mongodb://35.229.112.63/cool_db', function(err, db){
	if(err) return;
	console.log('conecto');
	/*tweet.find({lista:'modelo'}).find(function(err,docs){
		console.log(docs);
	});*/

	/*tweet.find().distinct('user').count(function(err,docs){
		console.log(docs);
	});*/
	app.listen(8080, function(){
		console.log('Servidor corriendo en http://localhost:8080');
	});

});
