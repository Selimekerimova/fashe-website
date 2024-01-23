let productsCard=document.querySelector(".productsCard")
let header=document.querySelector("header")
window.addEventListener("scroll",function(){
    if(scrollY>0){

        header.classList.add("scrollHeader")
    }else{
        header.classList.remove("scrollHeader")

    }
})

const BASE_URL=`http://localhost:8080/product`
// get
async function getAlldata(){
    try {
        let res= await axios(`${BASE_URL}`)
        // console.log(res.data);
        drawCard(res.data)
    } catch (error) {
        console.log(error);
    }
}
getAlldata()

// darwTable
function drawCard(data) {
    productsCard.innerHTML=""
    data.forEach(element => {
        productsCard.innerHTML+=`
        <div class="card">
                    <img src="${element.imgUrl}" alt="">
                    <p>${element.title}</p>
                    <p>${element.price}</p>
                    <p></p>
                    <a href="details.html">Details </a>
                </div>
        `
    });
}




// swiper
var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });