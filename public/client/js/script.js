
let next3 = document.getElementById('next3');
let prev3 = document.getElementById('prev3');
const slider_item = document.querySelectorAll('.loop-slider .slider .item');





let slider4_length = slider_item.length-1;
let background = document.querySelector('.background .dots ul.dots-container li.active3');
let  dots_item1 = document.querySelectorAll('.background .dots .dots-container li');
let active3 = 1;


next3.addEventListener('click', function() {

    let slider3 = document.querySelectorAll('.loop-slider .slider .item');
    document.querySelector('.loop-slider .slider').appendChild(slider3[0]);
    updataDot(1);
})
prev3.addEventListener('click', function() {

    let slider3 = document.querySelectorAll('.loop-slider .slider .item');
    document.querySelector('.loop-slider .slider').prepend(slider3[slider3.length-1]);
    updataDot(-1);
})


function updataDot (a) {
    let background = document.querySelector('.background .dots ul.dots-container li.active3');
    if (a > 0) {
        background.classList.remove('active3');
        active3 = (active3 + 1 >slider4_length )? 0 : active3+1;
        dots_item1[active3].classList.add('active3');
    }
    else {
        background.classList.remove('active3');
        active3 = (active3 -1 < 0)? slider4_length : active3-1;
        dots_item1[active3].classList.add('active3');
    }
}