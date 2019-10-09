var mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
	name: String, //skill name
	reqjob: String, //job restriction (empty if no restriction)
	type: String, //physical or magic
	acc: Number, //chance of hitting, can crit
	max: Number, //max roll
	min: Number, //min roll
	times: Number //number dice to roll
});

module.exports = mongoose.model("Skill", skillSchema);