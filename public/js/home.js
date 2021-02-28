showNameBox = () => {
	document.getElementById("nameContainer").style.visibility = "";
	if(document.getElementById("pvp").checked) {
		document.getElementById("name2").style.visibility = "";
	}
}

checkMode = (evt) => {
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
	document.getElementById(evt.target.id == "pvp" ? "pvcLbl" : "pvpLbl").classList.remove("active");	
}

checkDiff = (evt) => {
	let labels = ["easyLbl", "mediumLbl", "hardLbl"];


	labels.forEach(label => document.getElementById(label).classList.remove("active"));
	document.getElementById(evt.target.id + "Lbl").classList.add("active");
}