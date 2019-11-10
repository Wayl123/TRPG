//When skill is selected
$(".selectSkill").change(function(){
	var stat = $(this).find(":selected").val().split("/");
	var out = "";
	out += "Type: " + stat[0] + "<br>Accuracy: " + stat[1] + "+(";
	//Strength and magic stat improve accuracy of skill
	if(stat[0] === "physical"){
		out += stat[5];
	} else {
		out += stat[6];
	}
	out += ")<br>Damage: " + stat[3] + "-" + stat[2] + "<br>Rolls: " + stat[4];
	//Show detail of selected skill
	$(this).parent().children(".skillOut").html(out);
	
	//Activate use skill option
	//Never need to deactivate it since all selectable option need this button to be enabled
	$(this).parent().children(".useSkill").prop("disabled", false);
});

//When skill is used
$(".useSkill").click(function(){
	var stat = $(this).parent().find(".selectSkill :selected").val().split("/");
	var out = "";
	var rollAcc = Math.round(Math.random()*99)+1; //1-100 roll
	var accTotal = Number(stat[1]);
	//Add strength or magic stat to improve accuracy, max at 100
	if(stat[0] === "physical"){
		accTotal += Number(stat[5]);
	} else {
		accTotal += Number(stat[6]);
	}
	if(accTotal > 100)
		accTotal = 100;
	out += "Accuracy Check: " + rollAcc + "/" + accTotal;
	//Result line print out accuracy roll
	$("#damageResult").text(out);
	
	//Calculate damage result
	$("#damageInfo").text("");
	$("#damageDealt").text("");
	if(rollAcc <= accTotal){ //hit
		var times = Number(stat[4]);
		var sumDamage = 0;
		if(accTotal > 10 && rollAcc <= 10){ //crit hit, if acc is under 10 this doesn't apply
			times *= 2;
			$("#damageInfo").text("Crit ");
		}
		for(var i=0; i<times; i++){
			sumDamage += Math.round(Math.random()*(Number(stat[2])-Number(stat[3])))+Number(stat[3]);
		}
		$("#damageDealt").text(sumDamage);
	} else { //miss
		if(accTotal <= 90 && rollAcc > 90){ //crit miss, once acc is over 90 this doesn't apply
			$("#damageInfo").text("Crit Miss ");
		} else { //regular miss
			$("#damageInfo").text("Miss ");
		}
	}
});