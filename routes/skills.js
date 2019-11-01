var express = require("express"),
	router = express.Router(),
	//models
	Skill = require("../models/skill"),
	Weapon = require("../models/weapon"),
	Job = require("../models/job");
	
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

//new
router.get("/new", (req, res) => {
	res.render("skills/new");
});

//create
router.post("/", (req, res) => {
	Skill.create(req.body.skill, (err, skill) => {
		if(err){
			console.log(err);
		} else {
			Job.findOne({"name": skill.req}, (err, job) => {
				if(err || !job){
					console.log(err);
				} else {
					job.skills.push(skill);
					job.save();
				}
			});
			Weapon.findOne({"name": skill.req}, (err, weapon) => {
				if(err || !weapon){
					console.log(err);
				} else {
					weapon.skills.push(skill);
					weapon.save();
				}
			});
			res.redirect("/skill");
		}
	});
});
	
module.exports = router;