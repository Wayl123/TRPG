var express = require("express"),
	router = express.Router(),
	//models
	Character = require("../models/character"),
	Job = require("../models/job");
	
//landing
router.get("/", (req, res) => {
	res.redirect("/trpg");
});
	
module.exports = router;