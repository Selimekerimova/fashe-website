let id=new URLSearchParams(window.location.search).get("id")
let detail=document.querySelector(".details")
let menuIcon = document.querySelector(".fa-bars");

// console.log(id);

const BASE_URL=`http://localhost:8080/product`

// menu icon
menuIcon.addEventListener("click", function () {
    menuIcon.className === "fa-solid fa-bars"
      ? (menuIcon.className = "fa-solid fa-xmark")
      : (menuIcon.className = "fa-solid fa-bars");
  });


// get
async function getAlldata(){
    try {
        let res= await axios(`${BASE_URL}`)
        // console.log(res.data);
        drawDetail(res.data)
    } catch (error) {
        console.log(error);
    }
}
getAlldata()


function drawDetail(data){
    data.forEach(element => {
        if(element.id==id){
            detail.innerHTML+=`
            <div class="left">
                    <img src="${element.imgUrl}" alt="">
                </div>
                <div class="right">
                    <h1>${element.title}</h1>
                    <p>${element.price}</p>
                </div>
            `
        }
    });
}