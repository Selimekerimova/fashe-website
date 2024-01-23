let form = document.querySelector("form");
let header = document.querySelector("header");
let tbody = document.querySelector("tbody");
let addBtn = document.querySelector(".add");
let errorH1 = document.querySelector(".error");
let sortBtn = document.querySelector(".sortBtn");
let searchInp = document.querySelector("input");
let allInputs = document.querySelectorAll("input");
let arr;
let arrCopy;
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
    console.log(res.data);
    arr = res.data;
    arrCopy = [...res.data];
    darwTable(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAlldata();

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
    <button class="editBtn">Edit</button>
    </td>
    </tr>
    `;
  });
}
// post
// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   let obj = {
//     // imgUrl: allInputs[0].value,
//     title: allInputs[1].value,
//     price: allInputs[2].value,
//   };
//   console.log(obj);

//   if (allInputs[1].value && allInputs[2].value) {
//     try {
//       await axios.post(BASE_URL, obj);
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     errorH1.classList.toggle("show");
//   }
// });

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
  darwTable(filtered)
});
