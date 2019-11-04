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
	//routes
	characterRoutes = require("./routes/characters"),
	jobRoutes = require("./routes/jobs"),
	weaponRoutes = require("./routes/weapons"),
	skillRoutes = require("./routes/skills"),
	indexRoutes = require("./routes/index");

//seedDB();
const url = process.env.DATABASEURL || "mongodb://localhost:27017/trpg";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//use routes
app.use("/trpg", characterRoutes);
app.use("/job", jobRoutes);
app.use("/weapon", weaponRoutes);
app.use("/skill", skillRoutes);
app.use(indexRoutes);
	
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TRPG app is running on port ${ PORT }`);
});