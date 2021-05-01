function SignUp() {
	var form = document.getElementById("signup").getElementsByClassName("text-ip")
	var acc = form[0].value
	var u_name = form[1].value
	var password = form[2].value

	if(!u_name.match(/^[A-Za-z]\w{7,14}$/)){document.getElementById("name_e").innerHTML = "Username should contain 8-12 charecters. Can contain only alphanumeric charecters or underscore.";return}
	else{document.getElementById("name_e").innerHTML = ""}

	if(!password.match(/^[A-Za-z]\w{7,14}$/)){document.getElementById("pass_e").innerHTML = "Password should contain 8-12 charecters. Can contain only alphanumeric charecters or underscore.";return}
	else{document.getElementById("pass_e").innerHTML = ""}

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/SignUp');
	ourRequest.send(JSON.stringify({ "master_key": acc, "u_name": u_name, "pass": password}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var data = JSON.parse(ourRequest.responseText);
			if (data=="A"){
				var e_disp = document.getElementById("acc_e")
				e_disp.innerHTML = "Wrong Access Code."
			} else if (data=="U") {
				var e_disp = document.getElementById("name_e")
				e_disp.innerHTML = "Username already taken."
			} else {
				window.localStorage.setItem("CampMap_User_ID", data);
				window.location.href = "index.html";
			}
		} else {
			error('Server Error','Our Team is working on fixing it.')
		}
	}
}

function Login() {
	var form = document.getElementById("login").getElementsByClassName("text-ip")
	var u_name = form[0].value
	var password = form[1].value

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/login');
	ourRequest.send(JSON.stringify({ "u_name": u_name, "pass": password}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var data = JSON.parse(ourRequest.responseText);
			if (data==false){
				var e_disp = document.getElementById("log_e")
				e_disp.innerHTML = "Wrong Username & Password Combination."
			} else {
				window.localStorage.setItem("CampMap_User_ID", data);
				window.location.href = "index.html";
			}
		} else {
			error('Server Error','Our Team is working on fixing it.');
		}
	}
}

function Toggle(){
	login = document.getElementById("login")
	signup = document.getElementById("signup")
	if(login.style.display == "none"){
		login.style.display = "block"
		signup.style.display = "none"
	} else {
		login.style.display = "none"
		signup.style.display = "block"		
	}
}