var mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
	name: String, //skill name
	req: String, //what the skill is attach to
	type: String, //physical or magic
	acc: Number, //chance of hitting, can crit
	max: Number, //max roll
	min: Number, //min roll
	times: Number //number dice to roll
});

module.exports = mongoose.model("Skill", skillSchema);