const toggle = document.querySelector('.tgm');
const toggleClose = document.querySelector('tgm-close');
const ul = document.querySelector('.nav-list');
const li = document.querySelector('.nav-li');

toggle.addEventListener("click", tgmHandler);

function tgmHandler() {
    ul.classList.toggle("active");
    ul.classList.toggleClose("tgm-close");
    console.log("클릭")
}