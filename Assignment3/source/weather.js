"strict mode"

function moveUp(movingDivs, btn) {

	let dive = document.getElementsByClassName(movingDivs);
    let mybtn = document.getElementById(btn);
    

    
    if(dive[0].classList.contains(movingDivs)) {
        dive[0].style.animationName = "slideUp";
        mybtn.removeAttribute("onclick");
        mybtn.setAttribute("onclick", "moveDown('movingDivs', 'btn1')");
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
        mybtn.removeAttribute("onclick");
        mybtn.setAttribute("onclick", "moveUp('movingDivs', 'btn1')");
    }
    //todo: need async 
    if (dive[0].classList.contains("moreContent")){
		dive[0].classList.remove("moreContent");
        dive[0].classList.add("lessContent");
    }
}

function submit() {

    let city = document.getElementById("city").value;

    // let icon = document.getElementById("iconSVG");
    // icon.src = "../../weather/weatherDesign/assets/fewclouds-day.svg"
}