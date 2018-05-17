var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tweet_schema = new Schema({
	user: String,
	message: String,
	lista : [String],
	type: String
});

var tweet = mongoose.model("tweet", tweet_schema);

module.exports.tweet = tweet;
