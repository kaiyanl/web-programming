function moveUp(movingDivs, btn) {

	let dive = document.getElementsByClassName(movingDivs);
    let mybtn = document.getElementById(btn);
    
    if(dive[0].classList.contains(movingDivs)) {
        dive[0].style.animationName = "slideUp";
        mybtn.removeAttribute("onclick");
        mybtn.setAttribute("onclick", "moveDown('movingDivs', 'btn1')");
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
}