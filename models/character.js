var mongoose = require("mongoose");

var characterSchema = new mongoose.Schema({
	name: String, //character name
	jobs: [ //job specific skill
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job"
		}
	], 
	hp: Number, //health, death when under 0
	str: Number, //physical attack
	mag: Number, //magic attack
	def: Number, //physical defense
	res: Number, //magic defense
	dex: Number, //dodge, burst speed
	spd: Number, //movement speed, combat turn
	weapon: [ //list of weapon/upgrade
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Weapon"
		}
	]
});

module.exports = mongoose.model("Character", characterSchema);