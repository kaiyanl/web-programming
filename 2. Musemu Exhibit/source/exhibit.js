function disappear2(less, img2, ft, btn) {

	let dive = document.getElementsByClassName(less);
	let imag2 = document.getElementById(img2);
	let mybtn = document.getElementById(btn);
	let x=window.matchMedia("(min-width: 780px)");
	let foot = document.getElementsByClassName(ft);
	let btn1 = document.getElementById('btn1');
	let less1 = document.getElementById('less1');

	if (dive[0].classList.contains("lessContent")){
		dive[0].classList.remove("lessContent");
		dive[0].classList.add("moreBlockContent");
		if (x.matches){
			imag2.classList.remove("moreBlockContent");
			imag2.classList.add("lessContent");
		}
		dive[0].childNodes[1].classList.remove("lessContent");
		dive[0].childNodes[1].classList.add("moreInlineBlockContent");
		mybtn.innerHTML = "Read less ->";
		btn1.classList.remove("moreInitialConten");
		btn1.classList.add("lessContent");
		foot[0].classList.remove("lessContent");
		foot[0].classList.add("moreFlexContent");
		less1.classList.remove('lessContent');
		less1.classList.add('moreInlineContent');
	} else {
		dive[0].classList.remove("moreBlockContent");
		dive[0].classList.add("lessContent");
		if(x.matches){
			imag2.classList.remove("lessContent");
			imag2.classList.add("moreBlockContent");
		}
		dive[0].childNodes[1].classList.remove("moreInlineBlockContent");		
		dive[0].childNodes[1].classList.add("lessContent");
		mybtn.innerHTML = "Read more ->";
		btn1.classList.remove("lessContent");
		btn1.classList.add("moreInitialConten");
		foot[0].classList.remove("moreFlexContent");
		foot[0].classList.add("lessContent");
		less1.classList.remove('moreInlineContent');
		less1.classList.add('lessContent');
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
		mybtn.innerHTML = "Read more ->";
		mybtn2.innerHTML = "Read more ->";
		mybtn.classList.remove("lessContent");
	}
}
