showSettings = () => {
	document.getElementById("settings").style.visibility="";
	document.getElementById("leaderboard").classList.replace("d-flex", "d-none");

}

showNameBox = () => {
	document.getElementById("nameContainer").classList.replace("d-none", "d-block");
	document.getElementById("settingsButtons").classList.add("d-none");
	if(document.getElementById("pvp").checked) {
		document.getElementById("name2").style.visibility = "";
	}
}

checkMode = (evt) => {
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
	document.getElementById(evt.target.id == "pvp" ? "pvcLbl" : "pvpLbl").classList.remove("active");	

	if(document.getElementById("pvc").checked) {
		document.getElementById("diffSelect").classList.remove("d-none");
	} 
	else {
		document.getElementById("diffSelect").classList.add("d-none");
	}
}

checkDiff = (evt) => {
	let labels = ["easyLbl", "mediumLbl", "hardLbl"];

	labels.forEach(label => document.getElementById(label).classList.remove("active"));
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
}