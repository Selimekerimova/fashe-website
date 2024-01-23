let form = document.querySelector("form");
let header = document.querySelector("header");
let tbody = document.querySelector("tbody");
let addBtn = document.querySelector(".add");
let errorH1 = document.querySelector(".error");
let sortBtn = document.querySelector(".sortBtn");
let searchInp = document.querySelector("input");
let allInputs = document.querySelectorAll("input");
let menuIcon = document.querySelector(".fa-bars");

let arr;
let arrCopy;
let editId=null
const BASE_URL = `http://localhost:8080/product`;
window.addEventListener("scroll", function () {
  if (scrollY > 0) {
    header.classList.add("scrollHeader");
  } else {
    header.classList.remove("scrollHeader");
  }
});

// get
async function getAlldata() {
  try {
    let res = await axios(`${BASE_URL}`);
    // console.log(res.data);
    arr = res.data;
    arrCopy = [...res.data];
    darwTable(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAlldata();
// menu icon
menuIcon.addEventListener("click", function () {
  menuIcon.className === "fa-solid fa-bars"
    ? (menuIcon.className = "fa-solid fa-xmark")
    : (menuIcon.className = "fa-solid fa-bars");
});

// drawTable
function darwTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    tbody.innerHTML += `
    <tr>
    <td>${element.id}</td>
    <td>
    <img src="${element.imgUrl}" />
    </td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td>
    <button class="deleteBtn" onclick=deleteBtn("${element.id}",this)>Delete</button>
    <button class="editBtn" onclick=editBtn("${element.id}")>Edit</button>
    </td>
    </tr>
    `;
  });
}
// post
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    imgUrl: allInputs[1].value,
    title: allInputs[2].value,
    price: allInputs[3].value,
  };
  if (addBtn.innerText === "Add") {
    if (allInputs[2].value && allInputs[3]) {
      axios.post(`${BASE_URL}`, obj);
    } else {
      errorH1.classList.add("show");
    }
  }else{
    axios.patch(`${BASE_URL}/${editId}`,obj)
  }
});

// delete
async function deleteBtn(id, btn) {
  if (confirm("are you sure")) {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
  }
}

// sort
sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Asc") {
    this.innerText = "Des";
    sorted = arr.sort((a, b) => a.price - b.price);
  } else if (sortBtn.innerText === "Des") {
    this.innerText = "Def";

    sorted = arr.sort((a, b) => b.price - a.price);
  } else if (sortBtn.innerText === "Def") {
    sorted = arrCopy;
  }
  darwTable(sorted);
});

// search
searchInp.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  darwTable(filtered);
});

// edit
function editBtn(id){
  editId=id
  addBtn.innerText="Edit"
 let itemValue= arr.filter(item=>item.id==id)
//  console.log(itemValue[0]);

//  allInputs[1].value=itemValue[0].imgUrl
 allInputs[2].value=itemValue[0].title
 allInputs[3].value=itemValue[0].price
}