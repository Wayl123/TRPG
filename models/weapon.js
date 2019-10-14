var mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
	name: String, //weapon name
	reqjob: String, //job restriction (empty if no restriction)
	type: String, //physical or magic (only boost when using same type skill)
	max: Number, //max roll
	min: Number, //min roll
	times: Number, //number dice to roll
	skills: [ //weapon skill, character can use these skill when weapon equip
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Skill"
		}
	]
});

module.exports = mongoose.model("Weapon", skillSchema);