obj = campus["watumull"]
var navdiv = document.getElementById("sidebar");
var views = '<button onclick="w3_close()" class="w3-bar-item w3-black w3-xxlarge">&times;</button>' 
i = 0
for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		var val = obj[key];
		views += '<a onclick=render("watumull","'+key+'") class="w3-bar-item w3-button" >'+key+'</a>\n'
		i+=1
	}
}
navdiv.innerHTML=views
function render(college,view) {
		var mapdiv = document.getElementById("map");
		var map = ''
		var rooms = campus[college][view]
		var bottom = 0
		var right = 0
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i]["type"]=="room"){
				map += '<div class="'+rooms[i]["type"]+'" style="width:'+(rooms[i]["size"][0])+'vh;max-width:'+(rooms[i]["size"][0])+'vh;height:'+(rooms[i]["size"][1])+'vh;max-height:'+(rooms[i]["size"][1])+'vh;left:'+(rooms[i]["location"][0])+'vh;top:'+(rooms[i]["location"][1])+'vh;font-size:1.8vh;" onclick=alert("Hello")>'+rooms[i]["name"]+': Occupied</div>'
			}
			else{
				map += '<div class="'+rooms[i]["type"]+'" style="width:'+(rooms[i]["size"][0])+'vh;max-width:'+(rooms[i]["size"][0])+'vh;height:'+(rooms[i]["size"][1])+'vh;max-height:'+(rooms[i]["size"][1])+'vh;left:'+(rooms[i]["location"][0])+'vh;top:'+(rooms[i]["location"][1])+'vh;font-size:1.8vh;">'+rooms[i]["name"]+'</div>'
			}
			if(rooms[i]["location"][0]+rooms[i]["size"][0]-11 > right)
				{right = rooms[i]["location"][0]+rooms[i]["size"][0]-11}
			if(rooms[i]["location"][1]+rooms[i]["size"][1]-11 > bottom)
				{bottom = rooms[i]["location"][1]+rooms[i]["size"][1]-11}
		}
		map += '<div class="blank" style="width: 3vh;height: 3vh;max-width: 3vh;max-height: 3vh;left:'+(right+12)+'vh;top:'+(bottom+12)+'vh;"></div>'
		document.body.style.width = (right+15)+"vh"
		document.body.style.height = (bottom+15)+"vh"
		mapdiv.innerHTML = map
		w3_close()
}
function w3_open(){document.getElementById("sidebar").style.display = "block";}
function w3_close(){document.getElementById("sidebar").style.display = "none";}

function Update_Status(campus_name,view,room,purpose,token){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/Update/');
	ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	ourRequest.send(JSON.stringify({ "campus_name": campus, "view": views, "room": room, "purpose": purpose, "token": token}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var data = JSON.parse(ourRequest.responseText);
			if (data=="BadLogin"){
			} else if (data=="R") {
			}
		} else {
			alert('Server Error! Our Team is working on fixing it.')
		}
	}

}





function View_Status(campus_name,view){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/View/');
	ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	ourRequest.send(JSON.stringify({ "campus_name": campus_name, "view": view}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			return(status);
		} else {
			alert('Server Error! Our Team is working on fixing it.')
		}
	}

}


render("watumull","d")