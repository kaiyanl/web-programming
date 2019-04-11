
// function disappear(less, btn, ft) {

// 	let words = document.getElementById(less);
// 	let mybtn = document.getElementById(btn);


// 	if (words.style.display==="none"){
// 		words.style.display = "inline";
// 		mybtn.innerHTML = "Read less ->";
// 	} else {
// 		words.style.display = "none";
// 		mybtn.innerHTML = "Read more ->";
// 	}
// }

function disappear2(less, img2, ft, btn) {

	let dive = document.getElementsByClassName(less);
	// let imag1 = document.getElementById(img1);
	let imag2 = document.getElementById(img2);
	let mybtn = document.getElementById(btn);
	let ftr = document.getElementsByClassName(ft);
	let x=window.matchMedia("(min-width: 780px)");

	if (dive[0].classList.contains("lessContent")){
		dive[0].classList.remove("lessContent");
		dive[0].classList.add("moreBlockContent");
		// imag1.classList.remove("lessContent");
		// imag1.classList.add("moreBlockContent");
		if (x.matches){
			imag2.classList.remove("moreBlockContent");
			imag2.classList.add("lessContent");
			// ftr[0].classList.remove("lessContent");
			// ftr[0].classList.add("moreFlexContent");
		}
		dive[0].childNodes[1].classList.remove("lessContent");
		dive[0].childNodes[1].classList.add("moreInlineBlockContent");
		mybtn.innerHTML = "Read less ->";
	} else {
		dive[0].classList.remove("moreBlockContent");
		dive[0].classList.add("lessContent");
		// imag1.classList.remove("moreBlockContent");
		// imag1.classList.add("lessContent");
		if(x.matches){
			imag2.classList.remove("lessContent");
			imag2.classList.add("moreBlockContent");
			// ftr[0].classList.remove("moreFlexContent");
			// ftr[0].classList.add("lessContent");
		}
		dive[0].childNodes[1].classList.remove("moreInlineBlockContent");		
		dive[0].childNodes[1].classList.add("lessContent");
		mybtn.innerHTML = "Read more ->";
	}

	
}

function disappear3(less, img, ft, div, btn, btn2) {
	
	let a = document.getElementById(less);
	let imag = document.getElementsByClassName(img);
	let mybtn = document.getElementById(btn);
	let mybtn2 = document.getElementById(btn2);
	let ftr = document.getElementsByClassName(ft);
	let dive = document.getElementsByClassName(div);
	
	if (a.classList.contains("lessContent")){
		a.classList.remove("lessContent");
		a.classList.add("moreInlineContent");
		imag[0].classList.remove("lessContent");
		imag[0].classList.add("moreBlockContent");
		ftr[0].classList.remove("lessContent");
		ftr[0].classList.add("moreFlexContent");
		dive[0].classList.remove("lessContent");
		dive[0].classList.add("moreBlockContent");
		// ftr[1].classList.remove("lessContent");
		// ftr[1].classList.add("moreBlockContent");
		mybtn.innerHTML = "Read less ->";
		mybtn2.innerHTML = "Read less ->";
		mybtn.classList.add("lessContent");
    } else {
		a.classList.remove("moreInlineContent");
		a.classList.add("lessContent");
		imag[0].classList.remove("moreBlockContent");
		imag[0].classList.add("lessContent");
		ftr[0].classList.remove("moreFlexContent");
		ftr[0].classList.add("lessContent");
		dive[0].classList.remove("moreBlockContent");
		dive[0].classList.add("lessContent");
		// ftr[1].classList.remove("moreBlockContent");
		// ftr[1].classList.add("lessContent");
		mybtn.innerHTML = "Read more ->";
		mybtn2.innerHTML = "Read more ->";
		mybtn.classList.remove("lessContent");
	}
}

// function disappear3(less, img, btn) {
	
// 	let words = document.getElementById(less);
// 	let imag = document.getElementsByClassName(img);
// 	let mybtn = document.getElementById(btn);
	
// 	if (words.classList === "lessContent"){
// 		words.classList.remove("lessContent");
// 		words.classList.add("moreInlineContent");
// 		imag[0].classList.remove("lessContent");
// 		imag[0].classList.add("moreBlockContent");
// 		mybtn.innerHTML = "Read more ->";
//     } else {
// 		words.classList.remove("moreInlineContent");
// 		words.classList.add("lessContent");
// 		imag[0].classList.remove("moreBlockContent");
// 		imag[0].classList.add("lessContent");
// 		mybtn.innerHTML = "Read less ->";
// 	}
// }


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
