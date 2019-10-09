var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	//models
	Character = require("./models/character"),
	Skill = require("./models/skill"),
	Weapon = require("./models/weapon");

const url = process.env.DATABASEURL || "mongodb://localhost:27017/trpg";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//landing
app.get("/", (req, res) => {
	res.redirect("/trpg");
});

//trpg
//index
app.get("/trpg", (req, res) => {
	Character.find({}, (err, characters) => {
		if(err){
			console.log(err);
		} else {
			res.render("index", {characters: characters});
		}
	});
});

//new
app.get("/trpg/new", (req, res) => {
	res.render("new");
});

//create
app.post("/trpg", (req, res) => {
	Character.create(req.body.character, (err, character) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/trpg");
		}
	});
});
	
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TRPG app is running on port ${ PORT }`);
});