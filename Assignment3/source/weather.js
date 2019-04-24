"use strict";

function moveUp(movingDivs, btn) {
    
	let dive = document.getElementsByClassName(movingDivs);
    let mybtn = document.getElementById(btn);
    
    if(dive[0].classList.contains(movingDivs)) {
        dive[0].style.animationName = "slideUp";
//        mybtn.removeAttribute("onclick");
//        mybtn.setAttribute("onclick", "moveDown('movingDivs', 'btn1')");
    }
    
    if (dive[0].classList.contains("lessContent")){
		dive[0].classList.remove("lessContent");
        dive[0].classList.add("moreContent");
    }
    
}

function moveDown(movingDivs, btn) {

	let dive = document.getElementsByClassName(movingDivs);
    let mybtn = document.getElementById(btn);
    
    if(dive[0].classList.contains(movingDivs)) {
        dive[0].style.animationName = "slideDown";
//        mybtn.removeAttribute("onclick");
//        mybtn.setAttribute("onclick", "moveUp('movingDivs', 'btn1')");
    }
    
    //todo: need async 
    if (dive[0].classList.contains("moreContent")){
        setTimeout(function(){
        dive[0].classList.remove("moreContent");
        dive[0].classList.add("lessContent");
        },2000)
    }
}

function submit() {

    let city = document.getElementById("city").value;

    // let icon = document.getElementById("iconSVG");
    // icon.src = "../../weather/weatherDesign/assets/fewclouds-day.svg"
}

//-----------------------------------------------
//CORS

function makeCORSrequest() {
    let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=2394503900f66070c6167f05699ab124"
    
    let xhr = createCORSrequest('GET', url);
    
    xhr.onload = function() {
        let responseStr = xhr.responseText;
        let object = JSON.parse(responseStr);
        console.log(JSON.stringify(object, undefined, 2));
    }
    xhr.send();
}
    
function createCORSrequest(method, url){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}

//----------------------------------------------
//Doppler

function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;
		if (count >= 10) {
			console.log("Got 10 doppler images");
		    startAnimateDopplers();
        }
	}
}

function startAnimateDopplers(){
    let i = 0;
    let timer = setInterval(function(){
        i = animateDopplers(i);
        if(i == 10){
            i = 0;
        }
    }, 200);
}

function animateDopplers(i){
    pic = document.getElementById("dopplerMaps");
    pic.src = imageArray[i].src;
    pic.style.display = "inline";
    i++;
    return i;
}

function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;
}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

}
