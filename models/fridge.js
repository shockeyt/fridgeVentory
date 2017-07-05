var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FridgeSchema = new Schema({
	item: String,
	brand: String,
	quantity: Number,
	price: Number,
	picture: String
});

var Fridge = mongoose.model('Fridge', FridgeSchema);
module.exports = Fridge;