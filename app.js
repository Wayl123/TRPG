var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	//models
	Character = require("./models/character"),
	Skill = require("./models/skill"),
	Weapon = require("./models/weapon"),
	Job = require("./models/job"),
	//seed, used to seed the database with static items such as job and skill
	seedDB = require("./seeds");

seedDB();
const url = process.env.DATABASEURL || "mongodb://localhost:27017/trpg";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//landing
app.get("/", (req, res) => {
	res.redirect("/trpg");
});

//trpg
//index
app.get("/trpg", (req, res) => {
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
			res.render("index", {characters: characters});
		}
	});
});

//new
app.get("/trpg/new", (req, res) => {
	Job.find({"joblvl": 0}, (err, jobs) => {
		if(err){
			console.log(err);
		} else {
			res.render("new", {jobs: jobs});
		}
	});
});

//create
app.post("/trpg", (req, res) => {
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
app.get("/trpg/:id", (req, res) => {
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
			res.render("show", {character: character});
		}
	})
});

//edit
app.get("/trpg/:id/edit", (req, res) => {
	Character.findById(req.params.id).
	populate([{
		path: "jobs",
		select: "name"
	}]).exec((err, character) => {
		if(err){
			console.log(err);
		} else {
			res.render("edit", {character: character});
		}
	});
});

//update
app.put("/trpg/:id", (req, res) => {
	Character.findByIdAndUpdate(req.params.id, req.body.character, (err, character) => {
		res.redirect("/trpg/" + req.params.id);
	});
});
	
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TRPG app is running on port ${ PORT }`);
});