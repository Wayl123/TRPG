var express = require("express"),
	router = express.Router(),
	//models
	Skill = require("../models/skill"),
	Weapon = require("../models/weapon"),
	Job = require("../models/job");

//index
router.get("/", (req, res) => {
	Weapon.find({}).
	populate([{
		path: "skills", 
		select: "name"
	}]).exec((err, weapons) => {
		if(err){
			console.log(err);
		} else {
			res.render("weapons/index", {weapons: weapons});
		}
	});
});

//new
router.get("/new", (req, res) => {
	res.render("weapons/new");
});

//create
router.post("/", (req, res) => {
	Weapon.create(req.body.weapon, (err, weapon) => {
		if(err){
			console.log(err);
		} else {
			//link weapon to required job
			Job.findOne({name: weapon.req}, (err, job) => {
				if(err || !prejob){
					console.log(err);
				} else {
					job.weapon.push(weapon);
					job.save();
				}
			});
			//link skill that have this weapon as weapon skill
			Skill.find({"req": weapon.name}, (err, skills) => {
				if(err || !skills){
					console.log(err);
				} else {
					skills.forEach((skill) => {
						weapon.skills.push(skill);
					});
					weapon.save();
				}
			});
			res.redirect("/weapon");
		}
	});
});

//no show

//edit
router.get("/:id/edit", (req, res) => {
	Weapon.findById(req.params.id, (err, weapon) => {
		if(err){
			console.log(err);
		} else {
			res.render("weapons/edit", {weapon: weapon});
		}
	});
});

//update
router.put("/:id", (req, res) => {
	Weapon.findByIdAndUpdate(req.params.id, req.body.weapon, (err, weapon) => {
		if(err){
			console.log(err);
		} else {
			//in case job name is updated
			//unlink
			Job.updateOne({weapons: {$in: [req.params.id]}}, {$pull: {weapons: req.params.id}}, (err, affectedjob) => {
				if(err)
					console.log(err);
			});
			//unlink all skill
			weapon.skills = [];
			//relink
			Job.findOne({name: req.body.weapon.req}, (err, job) => {
				if(err || !prejob){
					console.log(err);
				} else {
					job.weapon.push(weapon);
					job.save();
				}
			});
			Skill.find({"req": req.body.weapon.name}, (err, skills) => {
				if(err || !skills){
					console.log(err);
				} else {
					skills.forEach((skill) => {
						weapon.skills.push(skill);
					});
					weapon.save();
				}
			});
			res.redirect("/weapon");
		}
	});
});

//destroy
router.delete("/:id", (req, res) => {
	Weapon.findByIdAndRemove(req.params.id, (err, weapon) => {
		if(err){
			console.log(err);
		} else {
			//unlink job that has this weapon as exclusive weapon
			Job.updateOne({weapons: {$in: [req.params.id]}}, {$pull: {weapons: req.params.id}}, (err, affectedjob) => {
				if(err)
					console.log(err);
			});
			res.redirect("/weapon");
		}
	});
});
	
module.exports = router;