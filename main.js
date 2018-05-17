var express = require('express');
var app = express();
var path = require('path');
var mongo = require('mongoose');
var tweet = require('./models/tweet').tweet;
var bodyParser = require('body-parser');
var redis = require('redis');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));

var client_entidades = redis.createClient({
		  port : 6379,
      host : '35.225.45.116',
      no_ready_check: true,
      auth_pass: 'AuU8HREWKc8e',
      db : 2,
});

var client2 = redis.createClient({
		  port : 6379,
      host : '35.225.45.116',
      no_ready_check: true,
      auth_pass: 'AuU8HREWKc8e',
      db : 1,
});

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
				client_entidades.keys("*", function (err, reply) {
					var contex = {Ttweets: TotalTweets,
						Tusuaios: TotalUsuarios,
						Timagenes: TotalImagenes,
						TCategorias: reply.length};
					res.render('dash', contex);
				});
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

app.get('/TopEtiquetas', (req, res)=>{
	res.render('TopCategorias');
});
var items = [];
app.get('/GetEtiquetas', (req, res)=>{
	client_entidades.keys("*", function (err, reply) {
		reply.forEach(function(element) {
			client_entidades.get(element, function (err, reply) {
				var item = {name: element , value: parseInt(reply.toString())};
				items.push(item);
			});
		});
		//console.log(items);
		res.send(items);
		items = [];
	});
});

app.get('/TopEntidades', (req, res)=>{
	res.render('TopEntidades');
});

var items2 = [];
app.get('/GetEntidades', (req, res)=>{
	client2.keys("*", function (err, reply) {
		reply.forEach(function(element) {
			client2.get(element, function (err, reply) {
				var item = {name: element , value: parseInt(reply.toString())};
				items2.push(item);
			});
		});
		//console.log(items);
		res.send(items2);
		items2 = [];
	});
});

//35.229.112.63
mongo.connect('mongodb://35.229.112.63/cool_db', function(err, db){
	if(err) return;
	console.log('conecto');
	client_entidades.on('connect', function() {
    console.log('Redis se conecto a la bd 2');
	});
	client2.on('connect', function() {
    console.log('Redis se conecto a la bd 1');
	});
	app.listen(8080, function(){
		console.log('Servidor corriendo en http://localhost:8080');
	});

});
