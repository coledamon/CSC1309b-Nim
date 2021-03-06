const settings = document.getElementById("settings");
const leaderboard = document.getElementById("leaderboard")
const nameContainer = document.getElementById("nameContainer");
const settingsButtons = document.getElementById("settingsButtons");
const pvp = document.getElementById("pvp");
const pvc = document.getElementById("pvc");
const name2 = document.getElementById("name2");
const diffSelect = document.getElementById("diffSelect");


showSettings = () => {
	settings.style.visibility="";
	leaderboard.classList.replace("d-flex", "d-none");
}

showNameBox = () => {
	nameContainer.classList.replace("d-none", "d-block");
	settingsButtons.classList.add("d-none");
	if(pvp.checked) {
		name2.style.visibility = "";
	}
}

checkMode = (evt) => {
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
	document.getElementById(evt.target.id == "pvp" ? "pvcLbl" : "pvpLbl").classList.remove("active");	

	if(pvc.checked) {
		diffSelect.classList.remove("d-none");
	} 
	else {
		diffSelect.classList.add("d-none");
	}
}

checkDiff = (evt) => {
	let labels = ["easyLbl", "mediumLbl", "hardLbl"];

	labels.forEach(label => document.getElementById(label).classList.remove("active"));
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
}