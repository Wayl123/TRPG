var express = require("express"),
	app = express();
	
app.get("/", (req, res) => {
	res.render("index");
});
	
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`TRPG app is running on port ${ PORT }`);
});