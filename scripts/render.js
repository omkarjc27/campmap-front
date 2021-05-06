obj = campus["watumull"]
var navdiv = document.getElementById("sidebar");
var views = '<button class="w3-xxlarge w3-cancel" style="text-align:right;" onclick="w3_close()">&times;</button><br>'
i = 0
for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
		var val = obj[key];
		views += '<a onclick=View_Status("watumull","'+key+'") class="w3-bar-item w3-button w3-round" style="font-size: 3vh;" >'+key+'</a>\n'
		i+=1
	}
}
var ratio = 0
views += '<hr>'
views += '<a href="entry.html#login" class="w3-bar-item w3-button w3-round"  style="font-size: 3vh;">Login</a>\n'
views += '<a href="entry.html#contact" class="w3-bar-item w3-button w3-round"  style="font-size: 3vh;">Contact Us</a>\n'
views += '<a href="entry.html#faq" class="w3-bar-item w3-button w3-round"  style="font-size: 3vh;">FAQs</a>\n'
navdiv.innerHTML=views

function search(value){
	var div = document.getElementById("searchres");
	div.innerHTML=""
	if(value!=""){	
		for (var key in campus["watumull"]) {
			if (campus["watumull"].hasOwnProperty(key)) {
				var rooms = campus["watumull"][key];
				for (var j = 0; j < rooms.length; j++) {
					if(rooms[j]["name"]!=""){
						term = rooms[j]["name"]+" - "+key
						if(term.toLowerCase().includes(value.toLowerCase())){
							div.innerHTML += '<a onclick=View_Status("watumull","'+key+'") class="w3-bar-item w3-button w3-round" style="z-index: 9;" >'+term+'</a><br>' 
						}
					}
				}	
			}
		}
		document.getElementById("searchclr").style.display="block";
		div.style.border="solid grey 1px"
	}else{
		var div = document.getElementById("searchres");
		div.style.border="none"
		document.getElementById("searchclr").style.display="none";
	}

}

function clearsearch(){
	var searchf = document.getElementById("searchfield");
	searchf.value = "";
	search("");
	var div = document.getElementById("searchres");
	div.style.border="none"
	document.getElementById("searchclr").style.display="none";
}

function render(college,view,status) {
		status = JSON.parse(status)
		if (Object.keys(status).length==0){var status = {"a":"b"}}
		document.getElementById("floorn").innerHTML = "<b>"+view+"</b>";
		var mapdiv = document.getElementById("map");
		var map = ''
		var rooms = campus[college][view]
		var bottom = 0
		var right = 0
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i]["type"]=="room"){
				map+= '<div class="'+rooms[i]["type"]+'" style="width:'+(rooms[i]["size"][0])+'vh;max-width:'+(rooms[i]["size"][0])+'vh;height:'+(rooms[i]["size"][1])+'vh;max-height:'+(rooms[i]["size"][1])+'vh;left:'+(rooms[i]["location"][0])+'vh;top:'+(rooms[i]["location"][1])+'vh;font-size:2.3vh;" >'+rooms[i]["name"]
				if (status.hasOwnProperty((rooms[i]["name"]).split(' ').join('\u00a0'))){
					map+=': <span class="w3-text-red">Occupied ('+status[(rooms[i]["name"]).split(' ').join('\u00a0')]+')</span>'
				}else{
					map+=': <span class="w3-text-green">Vacant </span>'
				}
				map+= '<button class="edit-btn" onclick=statusupdate("'+college+'\",\"'+view+'\",\"'+String(rooms[i]["name"]).split(' ').join('&nbsp;')+'\") ><i class="fa fa-pencil"></i></button></div>'
			}
			else if(rooms[i]["type"]=="door-u" || rooms[i]["type"]=="door-d")
			{
				map += '<div class="'+rooms[i]["type"]+'" style="width:'+(rooms[i]["size"][0])+'vh;max-width:'+(rooms[i]["size"][0])+'vh;height:'+(rooms[i]["size"][1])+'vh;max-height:'+(rooms[i]["size"][1])+'vh;left:'+(rooms[i]["location"][0]-10)+'vh;top:'+(rooms[i]["location"][1]-10)+'vh;font-size:2vh;">'+rooms[i]["name"]+'</div>'				
			}
			else{
				map += '<div class="'+rooms[i]["type"]+'" style="width:'+(rooms[i]["size"][0])+'vh;max-width:'+(rooms[i]["size"][0])+'vh;height:'+(rooms[i]["size"][1])+'vh;max-height:'+(rooms[i]["size"][1])+'vh;left:'+(rooms[i]["location"][0])+'vh;top:'+(rooms[i]["location"][1])+'vh;font-size:2vh;">'+rooms[i]["name"]+'</div>'
			}
			if(rooms[i]["location"][0]+rooms[i]["size"][0]-11 > right)
				{right = rooms[i]["location"][0]+rooms[i]["size"][0]-11}
			if(rooms[i]["location"][1]+rooms[i]["size"][1]-11 > bottom)
				{bottom = rooms[i]["location"][1]+rooms[i]["size"][1]-11}
		}
		map += '<div id="blank" style="width: 3vh;height: 3vh;max-width: 3vh;max-height: 3vh;left:'+(right+12)+'vh;top:'+(bottom+12)+'vh;"></div>'
		document.body.style.width = (right+25)+"vh"
		document.body.style.height = (bottom+25)+"vh"
		mapdiv.innerHTML = map
		w3_close()
		scaledown()
}
function scaledown(){
	var blank = document.getElementById("blank");
	var bottom = parseFloat(blank.style.top)
	var right = parseFloat(blank.style.left)
	var oldmap = document.getElementById("map")
	var newmap = document.getElementById("small-map")
	newmap.innerHTML = oldmap.innerHTML
	divs = newmap.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		var oldw = parseFloat(divs[i].style.width)
		var oldh = parseFloat(divs[i].style.height)

		ratio = 100/right
		hratio = ratio-(ratio*0.4)
		var neww = oldw*ratio
		var newh = oldh*hratio

		divs[i].style.width = (neww)+"vw"
		divs[i].style.maxWidth = (neww)+"vw"

		divs[i].style.height = (newh)+"vh"
		divs[i].style.maxHeight = (newh)+"vh"


		divs[i].style.left = ((parseFloat(divs[i].style.left)*ratio))+"vw"
		divs[i].style.top = ((parseFloat(divs[i].style.top)*hratio)+35)+"vh"

		divs[i].style.fontSize = "1vh"
		divs[i].style.margin = "0"
		divs[i].style.padding = "0"
	}
}
// call this to Disable
function disableScroll() {
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	window.onscroll = function(){window.scrollTo(scrollLeft, scrollTop);};
}

// call this to Enable
function enableScroll() {
  window.onscroll = function() {};
}
function ToggleZoom(){
	small = document.getElementById("small-map")
	map = document.getElementById("map")
	if(small.style.display == "none"){
		small.style.display = "block"
		map.style.display = "none"
		//window.scrollTo(0,0);
		ic = document.getElementById("zoomtog")
		ic.innerHTML = '<i class="fa fa-search-plus"></i>'
		disableScroll()
	} else {
		small.style.display = "none"
		map.style.display = "block"		
		ic = document.getElementById("zoomtog")
		ic.innerHTML = '<i class="fa fa-search-minus"></i>'
		enableScroll()
	}
}
function statusupdate(campus_name,view,room){
	if(window.localStorage.getItem("CampMap_User_ID")==null){
		document.getElementById("purpose_e").style.display = "block";		
	}
	else{
		document.getElementById('college_field').value=campus_name;
		document.getElementById('view_field').value=view;
		document.getElementById('room_field').value=room;
		document.getElementById("purpose").style.display = "block";
	}
}
function close_stat(){
	document.getElementById("purpose_e").style.display = "none";
	document.getElementById("purpose").style.display = "none";
}
function status_form(){
	var purp=document.getElementById('purpose_field').value;
	var college=document.getElementById('college_field').value;
	var view=document.getElementById('view_field').value;
	var room=document.getElementById('room_field').value;
	Update_Status(college,view,room,purp)
	close_stat()
}
function Update_Status(campus_name,view,room,purpose){
	var mapdiv = document.getElementById("map");
	mapdiv.innerHTML='<center><i class="fa fa-spinner fa-spin" style="font-size:10vh;margin-top: 35vh;"></i></center>'
	var token = window.localStorage.getItem("CampMap_User_ID");
	
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/Update/');
	ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	ourRequest.send(JSON.stringify({ "campus": campus_name, "view": view, "room": room, "purpose": purpose, "token": token}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var data = JSON.parse(ourRequest.responseText);
			if (data=="BadLogin"){
				window.location.href = "entry.html#login"
			} else if (data==true){
				View_Status(campus_name,view)
			}
		} else {
			alert('Server Error! Our Team is working on fixing it.')
		}
	}

}

function View_Status(campus_name,view){
	var searchf = document.getElementById("searchfield");
	searchf.value = "";
	search("");

	var div = document.getElementById("searchres");
	div.style.border="none"
	document.getElementById("searchclr").style.display="none";
	
	var mapdiv = document.getElementById("map");
	mapdiv.innerHTML='<center><i class="fa fa-spinner fa-spin" style="font-size:10vh;margin-top: 35vh;"></i></center>'
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('POST', 'https://campus-map-api.herokuapp.com/View/');
	ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	ourRequest.send(JSON.stringify({ "campus": campus_name, "view": view}));
	ourRequest.onload = function() {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			render(campus_name,view,ourRequest.responseText)
		} else {
			alert('Server Error! Our Team is working on fixing it.')
		}
	}

}
View_Status("watumull","GndFloor")