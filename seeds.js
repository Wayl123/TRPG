var mongoose = require("mongoose"),
	Character = require("./models/character"),
	Skill = require("./models/skill"),
	Weapon = require("./models/weapon"),
	Job = require("./models/job");

//data to add, comment out when added
var skillData = [
    // {
        // name: "Punch",
		// reqjob: "Novice",
		// type: "physical",
		// acc: 50,
		// max: 3,
		// min: 1,
		// times: 1
	// },
	// {
		// name: "Magic Orb",
		// reqjob: "Novice",
		// type: "magic",
		// acc: 50,
		// max: 3,
		// min: 1,
		// times: 1
	// }
]
 
var jobData = [
    // {
        // name: "Novice",
		// joblvl: 0
	// }
]

//function to add the data to database
function seedDB(){	
	jobData.forEach((jobSeed) => {
		Job.create(jobSeed, (err, job) => {
            if(err){
                console.log(err)
            } else {
                console.log("Added a job");
            }
        });
    }); 
	
	skillData.forEach((skillSeed) => {
		Skill.create(skillSeed, (err, skill) => {
			if(err){
				console.log(err);
			} else {
				console.log("Added a skill");
				Job.findOne({"name": skill.reqjob}, (err, job) => {
					if(err){
						console.log(err);
					} else {
						job.skills.push(skill);
						job.save();
						console.log("Add skill to job");
					}
				});
			}
		});
	});
}
 
module.exports = seedDB;