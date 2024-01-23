let productsCard = document.querySelector(".productsCard");
let header = document.querySelector("header");
let nav = document.querySelector("nav");
let loadMore = document.querySelector(".loadMore");
let menuIcon = document.querySelector(".fa-bars");
window.addEventListener("scroll", function () {
  if (scrollY > 0) {
    header.classList.add("scrollHeader");
  } else {
    header.classList.remove("scrollHeader");
  }
});
let limit = 3;
let products;
const BASE_URL = `http://localhost:8080/product`;

// menu icon
menuIcon.addEventListener("click", function () {
  menuIcon.className === "fa-solid fa-bars"
    ? (menuIcon.className = "fa-solid fa-xmark")
    : (menuIcon.className = "fa-solid fa-bars");
    nav.classList.toggle("responsiveNav")
});

// get
async function getAlldata() {
  try {
    let res = await axios(`${BASE_URL}`);
    // console.log(res.data);
    products = res.data;
    drawCard(res.data.slice(0, limit));
  } catch (error) {
    console.log(error);
  }
}
getAlldata();

// darwTable
function drawCard(data) {
  productsCard.innerHTML = "";
  data.forEach((element) => {
    productsCard.innerHTML += `
        <div class="card">
                    <img src="${element.imgUrl}" alt="">
                    <p>${element.title}</p>
                    <p>${element.price}</p>
                    <p></p>
                    <a href="details.html?id=${element.id}">Details </a>
                </div>
        `;
  });
}

// load more
loadMore.addEventListener("click", function () {
  limit += 3;
  drawCard(products.slice(0, limit));
  if (limit >= products.length) {
    this.remove();
  }
});

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
