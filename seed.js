var db = require('./models');

db.Fridge.remove({}, function(err, items) {
	if (err) {
		console.log("Error: ", err);
	}
	console.log("removed all items");
});

var fridgeItems = [
	{
		item: "Ketchup",
		brand: "Heinz",
		quantity: 1,
		price: 3.00,
		picture: "https://images-na.ssl-images-amazon.com/images/I/81W79j5rL1L._SY679_.jpg",
		types: "Other"
	},
	{
		item: "Eggs",
		brand: "Organic Valley",
		quantity: 12,
		price: 4.49,
		picture: "https://images-na.ssl-images-amazon.com/images/I/81saP2oHaJL._SX522_.jpg",
		types: "Dairy"
	},
	{
		item: "2 percent Milk",
		brand: "Dairy Pure",
		quantity: 1,
		price: 4.29,
		picture: "https://images-na.ssl-images-amazon.com/images/I/618E6G79wJL._SX522_.jpg",
		types: "Diary"
	},
	{
		item: "Mexican cheese",
		brand: "Sargento",
		quantity: 1,
		price: 2.49,
		picture: "https://images-na.ssl-images-amazon.com/images/I/71UkW8ONacL._SX522_.jpg",
		types: "Dairy"
	}	
];

db.Fridge.create(fridgeItems, function(err, items) {
	if (err) {
		console.log("Error: ", err);
	} else {
		console.log("Created new items ", items);
		process.exit();
	}
});