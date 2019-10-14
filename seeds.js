var mongoose = require("mongoose"),
	Character = require("./models/character"),
	Skill = require("./models/skill"),
	Weapon = require("./models/weapon"),
	Job = require("./models/job");

//data to add, comment out when added
var skillData = [
    // {
        // name: "Punch",
		// req: "Novice",
		// type: "physical",
		// acc: 50,
		// max: 3,
		// min: 1,
		// times: 1
	// },
	// {
		// name: "Magic Orb",
		// req: "Novice",
		// type: "magic",
		// acc: 50,
		// max: 3,
		// min: 1,
		// times: 1
	// },
	// {
		// name: "Swing sword",
		// req: "Training sword",
		// type: "physical",
		// acc: 30,
		// max: 5,
		// min: 1,
		// times: 1
	// },
	// {
		// name: "Magic spear",
		// req: "Training staff",
		// type: "magic",
		// acc: 30,
		// max: 5,
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

var weaponData = [
	// {
		// name: "Training sword",
		// reqjob: "Novice",
		// type: "physical",
		// max: 1,
		// min: 0,
		// times: 1
	// },
	// {
		// name: "Training staff",
		// reqjob: "Novice",
		// type: "magic",
		// max: 1,
		// min: 0,
		// times: 1
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
	
	weaponData.forEach((weaponSeed) => {
		Weapon.create(weaponSeed, (err, weapon) => {
            if(err){
                console.log(err)
            } else {
                console.log("Added a weapon");
            }
        });
    });
	
	skillData.forEach((skillSeed) => {
		Skill.create(skillSeed, (err, skill) => {
			if(err){
				console.log(err);
			} else {
				console.log("Added a skill");
				Job.findOne({"name": skill.req}, (err, job) => {
					if(err || !job){
						console.log(err);
					} else {
						job.skills.push(skill);
						job.save();
						console.log("Add skill to job");
					}
				});
				Weapon.findOne({"name": skill.req}, (err, weapon) => {
					if(err || !weapon){
						console.log(err);
					} else {
						weapon.skills.push(skill);
						weapon.save();
						console.log("Add skill to weapon");
					}
				});
			}
		});
	});
}
 
module.exports = seedDB;