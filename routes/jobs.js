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
	
module.exports = router;