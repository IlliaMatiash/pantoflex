// Event after click on Burger
const body = document.querySelector('body');
const burger = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

function check(){
    if(window.innerWidth > 776){
        burger.classList.remove('active');
        nav.classList.remove('active');
    }
}
burger.addEventListener('click', ()=>{
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

window.addEventListener('resize', function(event){
    check();
});