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
			//attach skill to job if is job skill
			Job.findOne({"name": skill.req}, (err, job) => {
				if(err || !job){
					console.log(err);
				} else {
					job.skills.push(skill);
					job.save();
				}
			});
			//attach skill to weapon if is weapon skill
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

//no show

//edit
router.get("/:id/edit", (req, res) => {
	Skill.findById(req.params.id, (err, skill) => {
		if(err){
			console.log(err);
		} else {
			res.render("skills/edit", {skill: skill});
		}
	});
});

//update
router.put("/:id", (req, res) => {
	Skill.findByIdAndUpdate(req.params.id, req.body.skill, (err, skill) => {
		if(err){
			console.log(err);
		} else {
			//in case skill req is changed
			//unlink
			Job.updateOne({skills: {$in: [req.params.id]}}, {$pull: {skills: req.params.id}}, (err, affectedJob) => {
				if(err)
					console.log(err);
			});
			Weapon.updateOne({skills: {$in: [req.params.id]}}, {$pull: {skills: req.params.id}}, (err, affectedWeapon) => {
				if(err)
					console.log(err);
			});
			//relink
			Job.findOne({name: req.body.skill.req}, (err, job) => {
				if(err || !job){
					console.log(err);
				} else {
					job.skills.push(skill);
					job.save();
				}
			});
			Weapon.findOne({"name": req.body.skill.req}, (err, weapon) => {
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

//destroy
router.delete("/:id", (req, res) => {
	Skill.findByIdAndRemove(req.params.id, (err, skill) => {
		if(err){
			console.log(err);
		} else {
			//unlink job that has the skill as job skill
			Job.updateOne({skills: {$in: [req.params.id]}}, {$pull: {skills: req.params.id}}, (err, affectedJob) => {
				if(err)
					console.log(err);
			});
			Weapon.updateOne({skills: {$in: [req.params.id]}}, {$pull: {skills: req.params.id}}, (err, affectedWeapon) => {
				if(err)
					console.log(err);
			});
			res.redirect("/skill");
		}
	});
});
	
module.exports = router;