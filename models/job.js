var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
	name: String, //class name
	joblvl: Number, //level restriction for job
	req: String, //prerequisite class
	adv: [ //class it can advance to
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job"
		}
	],
	skills: [ //class skill, character can use all job skill they have been
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Skill"
		}
	]
});

module.exports = mongoose.model("Job", jobSchema);