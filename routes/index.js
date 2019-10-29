var express = require("express"),
	router = express.Router();
	
//landing
router.get("/", (req, res) => {
	res.redirect("/trpg");
});
	
module.exports = router;