const carousel = document.querySelector(".carousel");
const arrowBtn = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
// const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// carouselChildrens.slice( - cardPerView).reverse().forEach(card => {
//     carousel.insertAdjacentHtml("afterbegin",card.outerHTML);
// });

// carouselChildrens.slice(0, cardPerView).forEach(card => {
//     carousel.insertAdjacentHtml("beforeend",card.outerHTML);
// });

arrowBtn.forEach(btn => {
    btn.addEventListener("click",()=>{
        carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
    });
});

const dragging = (e) =>{
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () =>{
    if(carousel.scrollLeft === 0){
        console.log("you have reched end");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        console.log("reached rigrhned")
    }
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
// carousel.addEventListener("scroll",infiniteScroll);