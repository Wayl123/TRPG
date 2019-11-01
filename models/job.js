var mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
	name: String, //class name
	joblvl: Number, //level restriction for job
	req: String,
	skills: [ //class skill, character can use all job skill they have been
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Skill"
		}
	]
});

module.exports = mongoose.model("Job", skillSchema);