var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


app.get('/api', function api_index (req, res) {
	res.json({message: "server running"});
});




//****REST ROUTES****

//get index
app.get('/fridge', function (req, res) {
	db.Fridge.find()
	.exec(function(err, fridge) {
		if (err) {return console.log("index error:" + err);}
		res.json(fridge);
	});
});

//get show
app.get('/fridge/:id', function (req, res) {
	db.Fridge.findOne({_id: req.params.id}, function(err, item) {
		console.log(req.params.id);
		res.json(item);
	});
});

//post
app.post('/fridge', function (req, res) {
	var newFridge = new db.Fridge({
		item: req.body.item,
		brand: req.body.brand,
		quantity: req.body.quantity,
		price: req.body.price,
		picture: req.body.picture,
		types: req.body.types
	});
	newFridge.save(function (err, item) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", item);
		res.json(item);
	});
});

//delete
app.delete('/fridge/:id', function (req, res) {
	var id = req.params.id;
	db.Fridge.findOneAndRemove({_id: id}, function (err, deletedItem) {
		console.log("deleted ", deletedItem);
		res.json(deletedItem);
	});
});

//update
app.put('/fridge/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.Fridge.findOne({_id: id}, function (err, updatedFridge) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.item) updatedFridge.item = req.body.item;
		if (req.body.brand) updatedFridge.brand = req.body.brand;
		if (req.body.quantity) updatedFridge.quantity = req.body.quantity;
		if (req.body.price) updatedFridge.price = req.body.price;
		if (req.body.picture) updatedFridge.picture = req.body.picture;
		if (req.body.types) updatedFridge.types = req.body.types;

		updatedFridge.save(function(err) {
			if (err) res.json({message: 'could not update'});
			console.log('updated ', updatedFridge);
			res.json({message: 'Fridge updated'});
		});
	});
});








app.listen(process.env.PORT || 3000, function() {
	console.log("express server running on localhost:3000");
});