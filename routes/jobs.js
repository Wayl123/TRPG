var express = require("express"),
	router = express.Router(),
	//models
	Skill = require("../models/skill"),
	Weapon = require("../models/weapon"),
	Job = require("../models/job");

//index
router.get("/", (req, res) => {
	Job.find({}).
	populate([{
		path: "skills", 
		select: "name"
	}]).exec((err, jobs) => {
		if(err){
			console.log(err);
		} else {
			res.render("jobs/index", {jobs: jobs});
		}
	});
});

//new
router.get("/new", (req, res) => {
	res.render("jobs/new");
});

//create
router.post("/", (req, res) => {
	Job.create(req.body.job, (err, job) => {
		if(err){
			console.log(err);
		} else {
			//link job to prerequisite job
			Job.findOne({name: job.req}, (err, prejob) => {
				if(err || !prejob){
					console.log(err);
				} else {
					prejob.adv.push(job);
					prejob.save();
				}
			});
			//link job that has it as prerequisite to it
			Job.find({req: job.name}, (err, jobs) => {
				if(err || !jobs){
					console.log(err);
				} else {
					jobs.forEach((advjob) => {
						job.adv.push(advjob);
					});
				}
				//link skill that have this job as job skill
				Skill.find({req: job.name}, (err, skills) => {
					if(err || !skills){
						console.log(err);
					} else {
						skills.forEach((skill) => {
							job.skills.push(skill);
						});
					}
					Weapon.find({req: job.name}, (err, weapons) => {
						if(err || !weapons){
							console.log(err);
						} else {
							weapons.forEach((weapon) => {
								job.weapons.push(weapon);
							});
						}
						job.save();
					});
				});
			});
			res.redirect("/job");
		}
	});
});

//no show

//edit
router.get("/:id/edit", (req, res) => {
	Job.findById(req.params.id, (err, job) => {
		if(err){
			console.log(err);
		} else {
			res.render("jobs/edit", {job: job});
		}
	});
});

//update
router.put("/:id", (req, res) => {
	Job.findByIdAndUpdate(req.params.id, req.body.job, (err, job) => {
		if(err){
			console.log(err);
		} else {
			//in case job name is updated
			//unlink
			Job.updateOne({adv: {$in: [req.params.id]}}, {$pull: {adv: req.params.id}}, (err, affectedjob) => {
				if(err)
					console.log(err);
			});
			job.adv = [];
			//unlink all skill
			job.skills = [];
			//unlink all weapons
			job.weapons = [];
			//relink
			Job.findOne({name: req.body.job.req}, (err, prejob) => {
				if(err || !prejob){
					console.log(err);
				} else {
					prejob.adv.push(job);
					prejob.save();
				}
			});
			Job.find({req: req.body.job.name}, (err, jobs) => {
				if(err || !jobs){
					console.log(err);
				} else {
					jobs.forEach((advjob) => {
						job.adv.push(advjob);
					});
				}
				Skill.find({req: req.body.job.name}, (err, skills) => {
					if(err || !skills){
						console.log(err);
					} else {
						skills.forEach((skill) => {
							job.skills.push(skill);
						});
					}
					Weapon.find({req: req.body.job.name}, (err, weapons) => {
						if(err || !weapons){
							console.log(err);
						} else {
							weapons.forEach((weapon) => {
								job.weapons.push(weapon);
							});
						}
						job.save();
					});
				});
			});
			res.redirect("/job");
		}
	});
});

//destroy
router.delete("/:id", (req, res) => {
	Job.findByIdAndRemove(req.params.id, (err, job) => {
		if(err){
			console.log(err);
		} else {
			//unlink job that has this job as advancement job
			Job.updateOne({adv: {$in: [req.params.id]}}, {$pull: {adv: req.params.id}}, (err, affectedjob) => {
				if(err)
					console.log(err);
			});
			res.redirect("/job");
		}
	});
});
	
module.exports = router;