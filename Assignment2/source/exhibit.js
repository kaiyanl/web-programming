
function disappear(less, btn) {

	let words = document.getElementById(less);
	let mybtn = document.getElementById(btn);


	if (words.style.display==="none"){
		words.style.display = "inline";
		mybtn.innerHTML = "Read less ->";
	} else {
		words.style.display = "none";
		mybtn.innerHTML = "Read more ->";
	}
}