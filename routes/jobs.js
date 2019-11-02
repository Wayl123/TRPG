var express = require("express"),
	router = express.Router(),
	//models
	Skill = require("../models/skill"),
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
			Job.findOne({"name": job.req}, (err, prejob) => {
				if(err || !prejob){
					console.log(err);
				} else {
					prejob.adv.push(job);
					prejob.save();
				}
			});
			Skill.find({"req": job.name}, (err, skills) => {
				if(err || !skills){
					console.log(err);
				} else {
					skills.forEach((skill) => {
						job.skills.push(skill);
					});
					job.save();
				}
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
			Job.updateOne({"name": job.req}, {$pull: {adv: job._id}}, (err, affectedJob) => {
				if(err)
					console.log(err);
			});
			res.redirect("/job");
		}
	});
});
	
module.exports = router;