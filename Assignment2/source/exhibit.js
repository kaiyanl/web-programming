
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


function dissapear3(less, img, btn) {
	
	let words = document.getElementByID(less);
	let img = document.getElementsByClassName(img);
	let mybtn = document.getElementById(btn);
	
	if (words.classList === "lessContent"){
		words.classList.remove("lessContent");
		words.classList.add("moreInitialContent");
		img.classList.remove("lessContent");
		img.classList.add("moreInitialContent");
		mybtn.innerHTML = "Read less ->";
    } else {
		words.classList.remove("moreInitialContent");
		words.classList.add("lessContent");
		img.classList.remove("moreInitialContent");
		img.classList.add("lessContent");
		mybtn.innerHTML = "Read more ->";
	}
}


/*
function dissapear3(less, img, div, footer, btn) {
	
	let words = document.getElementByID(less);
	let img = document.getElementsByClassName(img);
	let div = document.getElementsByClassName(div);
	let ftr = document.getElementsByClassName(footer);
	let mybtn = document.getElementById(btn);
	
	if (words.classList === "lessContent"){
		words.classList.remove("lessContent");
		words.classList.add("moreInitialContent");
		img.classList.remove("lessContent");
		img.classList.add("moreInitialContent");
		div.classList.remove("lessContent");
		div.classList.add("moreFlexContent");
		ftr.classList.remove("lessContent");
		ftr.classList.add("moreInitialContent");
		mybtn.innerHTML = "Read less ->";
	} else {
		words.classList.remove("moreInitialContent");
		words.classList.add("lessContent");
		img.classList.remove("moreInitialContent");
		img.classList.add("lessContent");
		div.classList.remove("moreFlexContent");
		div.classList.add("lessContent");
		ftr.classList.remove("moreInitialContent");
		ftr.classList.add("lessContent");
		mybtn.innerHTML = "Read more ->";
	}
	
}
*/
