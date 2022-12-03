let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  slideIndex++;
  
  if (slideIndex > slides.length) {
    slideIndex = 1
  }    
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
  
showSlides();

const container = document.querySelector('.recommend-app');

// 카드뷰 컨테이너 모바일 css
const cardcontainer = document.querySelector('.card-view-container'); 
const betacontainer = document.querySelector('.beta-card-view-container');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("모바일")
    cardcontainer.style.overflow = 'scroll';
    // cardcontainer.style.width = "100%"
    cardcontainer.style.height = '500px'
    cardcontainer.style.gridTemplateRows = "300px 300px 300px 300px 300px 300px";

    betacontainer.style.overflow = 'scroll';
    betacontainer.style.height = '500px'

}