var express = require("express"),
	router = express.Router(),
	//models
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
			res.redirect("/job");
		}
	});
});
	
module.exports = router;