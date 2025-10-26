const productsList = document.querySelector("#mainContainer");
const sideMenu1 = document.querySelector("#side-menu");
const sideMenu2 = document.querySelector("#side-menu2");
const search = document.querySelector("#search");
const suggestBox = document.querySelector(".suggest-box");

const login= document.querySelector("#login");

const cartCount = document.querySelector("#cartCount");

displayCartCount();
displayLoginStatus();

let dataList;
let cartBasket = [];

//Products Data Fetch Function
async function loadProducts() {
  try {
    const response = await fetch("../data/products.json");
    const data = await response.json();
    dataList = data;
    setSideMenu(data);
    displayProducts(data);
  } catch (error) {
    console.error(error);
  }
}
//Products Display Function
function displayProducts(data) {
  if (data.length > 0) {
    let products = "";
    data.forEach((product) => {
      products += `<div  class="col cart-box d-flex justify-content-center justify-content-lg-start">
          <div class="card" style="width: 20rem; min-width: 15rem">
            <img
              src="${product.img}"
              class="card-img-top"
              alt="..."
               onclick='getItem(this)'
            />
            <div class="card-body">
              <h5 class="card-title" style="font-size: 15px">${
                product.name
              }</h5>
              <div class="d-flex mb-2 icon-height">

              ${starRating(product.star)}
      
    </div>
              <p class="card-text" style="font-size: 12px">
                ${product.dese}
              </p>
            </div>
            <div class="mb-4 d-flex justify-content-around">
              <h3 style="font-size: 20px"><svg class="icon-height" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
</svg>${product.amt}</h3>
             ${
               cartBasket.indexOf(product.name) == -1
                 ? `<button class="btn addCartBtn btn-success btn-sm"> <svg class="icon-height" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg> Add Cart</button>`
                 : `<button class="btn addCartBtn btn-success disabled btn-sm"> <svg class="icon-height" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg> Alredy Cart</button>`
             }
            </div>
          </div>
        </div>
`;
    });

    productsList.innerHTML = products;

    // cart btn EventListener functions

    let cartBtns = document.querySelectorAll(
      ".btn.addCartBtn.btn-success.btn-sm"
    );

    cartBtns.forEach((btn) => {
      btn.addEventListener("click", addCart);
    });
  } else {
    suggestBox.style.display = "none";
    productsList.innerHTML = `<div class="no-product-box"><div class="no-product">
            <img src="../img/product-not-found.png" alt="product-not-found">
        </div></div>`;
  }
}
// SideMenu Function
function setSideMenu(data) {
  const allCategories = data.map((product) => product.catagory);
  const catagorys = [
    "All",
    ...allCategories.filter((product, index) => {
      return allCategories.indexOf(product) === index;
    }),
  ];
  sideMenu1.innerHTML = catagorys
    .map((catagory) => `  <li class="nav_link_li">${catagory}</li>`)
    .join("");

  sideMenu2.innerHTML = catagorys
    .map((catagory) => `  <li class="nav_link_li">${catagory}</li>`)
    .join("");

  sideMenu1.addEventListener("click", (e) => {
    const selectedCatagorys = e.target.textContent;
    selectedCatagorys === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((product) => product.catagory == selectedCatagorys)
        );
  });

  sideMenu2.addEventListener("click", (e) => {
    const selectedCatagorys = e.target.textContent;
    selectedCatagorys === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((product) => product.catagory == selectedCatagorys)
        );
  });
}

//Search Function
search.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase().trim();

  if (value) {
    let suggest = [];
    if (value.length) {
      suggestBox.style.display = "block";
      suggest = dataList.filter((keyword) => {
        return keyword.name.toLowerCase().includes(value.toLowerCase());
      });
    }
    
      
    
    display(suggest);

    //console.log(suggest);

    displayProducts(
      dataList.filter(
        (product) => product.name.toLowerCase().indexOf(value) !== -1
      )
    );
  } else {
    displayProducts(dataList);
    suggestBox.style.display = "none";
    
  }
});

function display(suggest) {
  const content = suggest.map((list) => {
    return `<li onclick='selectInput(this)'>${list.name}</li>`;
  });
  suggestBox.innerHTML = `<ul>${content.join("")}</ul>`;
}

function selectInput(list) {
  search.value = list.innerHTML;
  suggestBox.innerHTML = "";
  displayProducts(
    dataList.filter(
      (product) => product.name.toLowerCase() == search.value.toLowerCase()
    )
  );
}

//Add Cart
function addCart() {
  let item = this.parentElement.parentElement;
  let itemTitle = item
    .querySelector(".card-body")
    .querySelector(".card-title").innerHTML;

  let itemFilterData = dataList.filter((data) => itemTitle == data.name);

  addToLocalStorage(itemFilterData);
}

function addToLocalStorage(itemFilterData) {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];

  cartBasket = [];

  storeData.forEach((item) => {
    cartBasket.push(item[0].name);
  });

  if (storeData.length == 0) {
    storeData.push(itemFilterData);

    localStorage.setItem("cartData", JSON.stringify(storeData));

    checkCartBasket();
    displayCartCount();
  }

  if (cartBasket.indexOf(itemFilterData[0].name) == -1) {
    storeData.push(itemFilterData);

    localStorage.setItem("cartData", JSON.stringify(storeData));

    checkCartBasket();
    displayCartCount();
  }
}

function displayCartCount() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];
  if (storeData.length > 0) {
    cartCount.innerHTML = ` <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
          >
          ${storeData.length}  
          </span>`;
  } else {
    cartCount.innerHTML = "";
  }
}

function checkCartBasket() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];

  cartBasket = [];

  storeData.forEach((item) => {
    cartBasket.push(item[0].name);
  });
  displayProducts(dataList);
}

//Redirect to http://127.0.0.1:5500/singelProduct.html
function getItem(data) {
  let itemTitle = data.parentElement.querySelector(".card-title").innerHTML;

  let oneItem = dataList.filter((item) => item.name == itemTitle);

  localStorage.setItem("oneProduct", JSON.stringify(oneItem));

  window.location.href = "singelProduct.html";
}

function loginPage(){
  const LoginData = JSON.parse(localStorage.getItem("LoginData")) || [];
  if(LoginData.username){
    if (confirm("Are Your Sure to LogOut")) {
      login.classList.remove("rounded-5");
      login.innerHTML ="Login";
      localStorage.removeItem("LoginData");

    }
  }else{
    window.location.href = "login.html";
  }
 
}
function displayLoginStatus(){
  const LoginData = JSON.parse(localStorage.getItem("LoginData")) || [];
  
  if(LoginData.username){
    login.innerHTML = LoginData.username.charAt(0).toUpperCase();
    login.classList.add("rounded-5");
  }else{
    login.classList.remove("rounded-5");
    login.innerHTML ="Login";
  }

}

function starRating(rating){
 let star="";

 for(let i=0;i<5;i++){

  if(i<Math.floor(rating)){
    star+='<i class="bi bi-star-fill" style="color: gold"></i>';
  }else if((i+0.5) == rating){
    star+='<i class="bi bi-star-half" style="color: gold"></i>';
  }else{
   star+='<i class="bi bi-star "style="color: #D9D9D9"></i>';
  }

 }


  return star;

}
loadProducts();
checkCartBasket();
