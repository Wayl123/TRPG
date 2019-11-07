$(".selectSkill").change(function() {
	var skill = $(this).find(":selected").val().split("/");
	var out = "Type: " + skill[0] + "<br>Accuracy: " + skill[1] + "<br>Damage: " + skill[3] + "-" + skill[2] + "<br>Rolls: " + skill[4];
	$(this).parent().children(".skillOut").html(out);
});