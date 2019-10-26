//delete job from character
$(".deleteJob").click((event) => {
	character.jobs.splice(character.jobs.findIndex(job => job.name === this.name), 1);
	$(this).parent().remove();
	event.stopPropagation();
});