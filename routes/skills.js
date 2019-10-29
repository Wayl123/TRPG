var express = require("express"),
	router = express.Router(),
	//models
	Skill = require("../models/skill");
	
//index
router.get("/", (req, res) => {
	Skill.find({}, (err, skills) => {
		if(err){
			console.log(err);
		} else {
			res.render("skills/index", {skills: skills});
		}
	});
});
	
module.exports = router;