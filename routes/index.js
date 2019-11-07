var express = require("express"),
	router = express.Router(),
	//models
	Character = require("../models/character");
	
//landing
router.get("/", (req, res) => {
	res.redirect("/trpg");
});

router.get("/battle", (req, res) => {
	Character.find({}).
	populate([{
		path: "jobs",
		populate: {path: "skills"}
	},
	{
		path: "weapon",
		populate: {path: "skills"}
	}]).exec((err, characters) => {
		if(err){
			console.log(err);
		} else {
			res.render("battle", {characters: characters});
		}
	});
});
	
module.exports = router;