let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var
let object;
let iconToImage = { "01d" : "../weatherDesign/assets/clearsky.svg",
                    "01n" : "../weatherDesign/assets/clear-night.svg",
                    "02d" : "../weatherDesign/assets/fewclouds-day.svg",
                    "02n" : "../weatherDesign/assets/fewclouds-night.svg",
                    "03d" : "../weatherDesign/assets/scatteredclouds.svg",
                    "03n" : "../weatherDesign/assets/scatteredclouds.svg",
                    "04d" : "../weatherDesign/assets/brokencloud.svg",
                    "04n" : "../weatherDesign/assets/brokencloud.svg",
                    "50d" : "../weatherDesign/assets/mist.svg",
                    "50n" : "../weatherDesign/assets/mist.svg",
                    "09d" : "../weatherDesign/assets/showerrain.svg",
                    "09n" : "../weatherDesign/assets/showerrain.svg",
                    "10d" : "../weatherDesign/assets/rain-day.svg",
                    "10n" : "../weatherDesign/assets/rain-night.svg",
                    "13d" : "../weatherDesign/assets/snow.svg",
                    "13n" : "../weatherDesign/assets/snow.svg",
                    "11d" : "../weatherDesign/assets/thunderstorms.svg",
                    "11n" : "../weatherDesign/assets/thunderstorms.svg" 
                   }

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
       
    makeCORSrequest(city);

    // let icon = document.getElementById("iconSVG");
    // icon.src = "../../weather/weatherDesign/assets/fewclouds-day.svg"
}

//-----------------------------------------------
//CORS

function makeCORSrequest(city) {
    let url = `http://api.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=imperial&APPID=2394503900f66070c6167f05699ab124`;
    
    let xhr = createCORSrequest('GET', url);
    
    xhr.onload = function() {
        let responseStr = xhr.responseText;
        object = JSON.parse(responseStr);
        console.log(JSON.stringify(object, undefined, 2));
        setAllWeather(object);
    }
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };
    
    xhr.send();
    //setAllWeather();
}
    
function createCORSrequest(method, url){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}

function setAllWeather(object){
//Initialize temperatures
    
    let divTemp = document.getElementById("temp");
    let divTemp2 = document.getElementById("temp2");
    let divTemp3 = document.getElementById("temp3");
    let divTemp4 = document.getElementById("temp4");
    let divTemp5 = document.getElementById("temp5");
    let divTemp6 = document.getElementById("temp6");
    
    let temp1 = Math.round(object.list[0].main.temp);
    let temp2 = Math.round(object.list[1].main.temp);
    let temp3 = Math.round(object.list[2].main.temp);
    let temp4 = Math.round(object.list[3].main.temp);
    let temp5 = Math.round(object.list[4].main.temp);
    let temp6 = Math.round(object.list[5].main.temp);
    
    divTemp.textContent = temp1 + "\xB0";
    divTemp2.textContent = temp2 + "\xB0";
    divTemp3.textContent = temp3 + "\xB0";
    divTemp4.textContent = temp4 + "\xB0";
    divTemp5.textContent = temp5 + "\xB0";
    divTemp6.textContent = temp6 + "\xB0";
    
//Inititalize times
    
    let divTime = document.getElementById("currentTime");
    let divTime2 = document.getElementById("time2");
    let divTime3 = document.getElementById("time3");
    let divTime4 = document.getElementById("time4");
    let divTime5 = document.getElementById("time5");
    let divTime6 = document.getElementById("time6");
    
    let time1 = new Date();
    let time2 = time1.getHours() + 1;
    let time3 = time1.getHours() + 2;
    let time4 = time1.getHours() + 3;
    let time5 = time1.getHours() + 4;
    let time6 = time1.getHours() + 5;
    
    divTime.textContent = time1.getHours();
    divTime2.textContent = time2;
    divTime3.textContent = time3;
    divTime4.textContent = time4;
    divTime5.textContent = time5;
    divTime6.textContent = time6;
    
//Initialize images
    
    let divImg = document.getElementById("img1");
    let divImg2 = document.getElementById("img2");
    let divImg3 = document.getElementById("img3");
    let divImg4 = document.getElementById("img4");
    let divImg5 = document.getElementById("img5");
    let divImg6 = document.getElementById("img6");
    
    divImg.src = iconToImage[object.list[0].weather[0].icon];
    divImg2.src = iconToImage[object.list[1].weather[0].icon];
    divImg3.src = iconToImage[object.list[2].weather[0].icon];
    divImg4.src = iconToImage[object.list[3].weather[0].icon];
    divImg5.src = iconToImage[object.list[4].weather[0].icon];
    divImg6.src = iconToImage[object.list[5].weather[0].icon];
    
}
/*
function getTime(ind) {
    let time = new Date(Date(object.list[ind].dt_txt));
    
     if(time.getHours > 12){
        divTime.textContent = time.getHours - 12 + "PM";
    }
    re
}
*/
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
