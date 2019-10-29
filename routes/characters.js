var express = require("express"),
	router = express.Router(),
	//models
	Character = require("../models/character"),
	Job = require("../models/job");

//index
router.get("/", (req, res) => {
	Character.find({}).
	populate([{
		path: "jobs",
		populate: {path: "skills", select: "name"}
	},
	{
		path: "weapon",
		populate: {path: "skills", select: "name"}
	}]).exec((err, characters) => {
		if(err){
			console.log(err);
		} else {
			res.render("characters/index", {characters: characters});
		}
	});
});

//new
router.get("/new", (req, res) => {
	Job.find({"joblvl": 0}, (err, jobs) => {
		if(err){
			console.log(err);
		} else {
			res.render("characters/new", {jobs: jobs});
		}
	});
});

//create
router.post("/", (req, res) => {
	Character.create(req.body.character, (err, character) => {
		if(err){
			console.log(err);
		} else {
			Job.findOne({"name": req.body.job}, (err, job) => {
				if(err){
					console.log(err);
				} else {
					character.jobs.push(job);
					character.save();
					res.redirect("/trpg");
				}
			});
		}
	});
});

//show
router.get("/:id", (req, res) => {
	Character.findById(req.params.id).
	populate([{
		path: "jobs",
		populate: {path: "skills"}
	},
	{
		path: "weapon",
		populate: {path: "skills"}
	}]).exec((err, character) => {
		if(err){
			console.log(err);
		} else {
			res.render("characters/show", {character: character});
		}
	})
});

//edit
router.get("/:id/edit", (req, res) => {
	Character.findById(req.params.id).
	populate([{
		path: "jobs",
		select: "name"
	}]).exec((err, character) => {
		if(err){
			console.log(err);
		} else {
			res.render("characters/edit", {character: character});
		}
	});
});

//update
router.put("/:id", (req, res) => {
	Character.findByIdAndUpdate(req.params.id, req.body.character, (err, character) => {
		res.redirect("/trpg/" + req.params.id);
	});
});

module.exports = router;