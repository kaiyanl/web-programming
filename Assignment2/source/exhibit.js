
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

function disappear2(less, btn) {

	let words = document.getElementsByClassName(less);

	let mybtn = document.getElementById(btn);

	if (words[0].style.display==="none"){
		words[0].style.display = "block";
		mybtn.innerHTML = "Read less ->";
	} else {
		words[0].style.display = "none";
		mybtn.innerHTML = "Read more ->";
	}
}