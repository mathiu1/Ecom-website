const cartCount = document.querySelector("#cartCount");
const loadItem = document.querySelector("#loadItem");
const similarItems = document.querySelector("#mainContainer");
const login = document.querySelector("#login");

let dataList;
let cartBasket = [];
let singelitem;
let qtyValue;

function displayCartCount() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];
  if (storeData.length > 0) {
    cartCount.innerHTML = ` <span
    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
  >
  ${storeData.length}  
  </span>`;
  }
  checkCartBasket();

  loadProduct();
}

//Products Data Fetch Function
async function fetchProducts(_title, _catagory) {
  try {
    const response = await fetch("../data/products.json");
    const data = await response.json();
    dataList = data;

    let title = _title;
    let catagory = _catagory;

    let setCatagory = dataList.filter(
      (item) => item.catagory == catagory && item.name !== title
    );

    let products = "";

    setCatagory.forEach((product) => {
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

      similarItems.innerHTML = products;

      let cartBtns = document.querySelectorAll(
        ".btn.addCartBtn.btn-success.btn-sm"
      );

      cartBtns.forEach((btn) => {
        btn.addEventListener("click", addCart);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function loadProduct() {
  const storeData = JSON.parse(localStorage.getItem("oneProduct")) || [];
  singelitem = storeData;

  const title = storeData[0].name;
  const catagory = storeData[0].catagory;

  if (storeData.length > 0) {
    loadItem.innerHTML = `<section class="py-5">
        <div class="container">
          <div class="row gx-5">
            <aside class="col-lg-6 ">
              <!-- gallery-wrap Start -->
              <div class="rounded-4 mb-3 d-flex justify-content-center ">
                <img
                  style="max-width: 60%; max-height: 100h; margin: auto"
                  class="rounded-4 mainImg fit"
                  src="${storeData[0].img}"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                />
              </div>

              <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
      
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
    <div id="carouselExampleIndicators" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide "></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" >
    
      <img src="${storeData[0].img}" class="d-block w-100" alt="..."
       style="max-width: 60%; max-height: 100h; margin: auto">
    </div>
    <div class="carousel-item">
      <img src="${
        storeData[0].img2
      }" class="d-block w-100" alt="..."style="max-width: 60%; max-height: 100h; margin: auto">
    </div>
    <div class="carousel-item">
      <img src="${
        storeData[0].img3
      } "" class="d-block w-100" alt="..."style="max-width: 60%; max-height: 100h; margin: auto">
    </div>
    <div class="carousel-item">
      <img src="${
        storeData[0].img4
      } "" class="d-block w-100" alt="..."style="max-width: 60%; max-height: 100h; margin: auto">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
     
      
    </div>
  </div>
</div>

 <!-- Modal -->
              <div class="d-flex justify-content-center mb-3">
                <img
                  width="60"
                  height="60"
                  class="rounded-2 border mx-2 imgbtn object-fit-cover"
                  src="${storeData[0].img}"
                />

                <img
                  width="60"
                  height="60"
                  class="rounded-2 border mx-2 imgbtn object-fit-cover"
                  src="${storeData[0].img2} "
                />

                <img
                  width="60"
                  height="60"
                  class="rounded-2 border mx-2 imgbtn object-fit-cover"
                  src="${storeData[0].img3} "
                />

                <img
                  width="60"
                  height="60"
                  class="rounded-2 border mx-2 imgbtn object-fit-cover"
                  src=" ${storeData[0].img4} "
                />
              </div>

              <!-- gallery-wrap end -->
            </aside>
            <main class="col-lg-6">
              <div class="ps-lg-3">
                <h4 class="title text-dark ">
                ${storeData[0].name}
                </h4>
                <div class="d-flex flex-row my-1">
                  <div class="text-warning mb-1 me-2">
                  <div class="rating">
      <input class="ratingBtn" type="radio" name="rating"  id="star10" value="5">
      <label  for="star10" class="full "></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star9" value="4.5">
      <label  for="star9" class="half"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star8" value="4">
      <label for="star8" class="full"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star7" value="3.5">
      <label for="star7" class="half"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star6" value="3">
      <label for="star6" class="full"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star5" value="2.5">
      <label for="star5" class="half"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star4" value="2">
      <label for="star4" class="full"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star3" value="1.5">
      <label for="star3" class="half"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star2" value="1">
      <label for="star2" class="full"></label>

      <input class="ratingBtn" type="radio" name="rating"  id="star1" value="0.5">
      <label for="star1" class="half"></label>
       
    </div>
   <p class="rating-value ms-2">Your Feedback</p>
                    
                  </div>
                  
                  
                </div>
               

                <div class="mb-4">
                  <span class="h5"
                    ><svg
                      class="icon-height"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-currency-rupee"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"
                      /></svg
                    > ${storeData[0].amt}</span
                  >
                </div>

                <p class="mb-4">
                   ${storeData[0].dese}
                </p>

                <hr />

                <div class="row ">
                  <!-- col.// -->
                  <div class="col-md-4 col-6 mb-3">
                    <div>
                      <label class="mb-2 d-block">Quantity</label>
                      <div class="input-group mb-3" style="width: 170px">
                        <button
                          class="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          class="form-control text-center border border-secondary"
                          id="qtyBox"
                          min="1"
                          max="5"
                          value= ${storeData[0].qty}
                          readonly
                          
                        />
                        <button
                          class="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                            />
                          </svg>
                        </button>
                      </div>

                      ${
                        cartBasket.indexOf(storeData[0].name) == -1
                          ? `<button id="addCart1" class="btn addCartBtn btn-success btn-sm"> <svg class="icon-height" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg> Add Cart</button>`
                          : `<button id="addCart1" class="btn addCartBtn btn-success disabled btn-sm"> <svg class="icon-height" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg> Alredy Cart</button>`
                      }
            
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>`;

    const addCart1 = document.querySelector("#addCart1");
    addCart1.addEventListener("click", addCartFunction);

    let imgbtn = document.querySelectorAll(
      ".rounded-2.border.mx-2.imgbtn.object-fit-cover"
    );
    let mainImg = document.querySelector(".rounded-4.mainImg.fit");

    imgbtn.forEach((btn) => {
      btn.addEventListener("mouseover", changeImg);
    });
    /* imgbtn.forEach((btn) => {
      btn.addEventListener("mouseleave", changeImg1);
    });*/
    const radioElement=document.querySelectorAll('.ratingBtn');
    const rating=document.querySelector('.rating-value');
    const plusBtn = document.querySelector("#button-addon2");
    const qtyBox = document.querySelector("#qtyBox");
    const minusBtn = document.querySelector("#button-addon1");

    radioElement.forEach((radio)=>{
      radio.addEventListener('click',()=>{
          let value=radio.value;
          rating.innerText=`${value} of 5 Your Feedback`;
          
      });
    });

    plusBtn.addEventListener("click", function () {
      if (Number(qtyBox.getAttribute("value")) < 5)
        qtyBox.setAttribute("value", Number(qtyBox.getAttribute("value")) + 1);
      qtyValue = qtyBox.getAttribute("value");
    });

    minusBtn.addEventListener("click", function () {
      if (Number(qtyBox.getAttribute("value")) > 1) {
        qtyBox.setAttribute("value", Number(qtyBox.getAttribute("value")) - 1);
        qtyValue = qtyBox.getAttribute("value");
      }
    });

    qtyBox.addEventListener("change", changeQty);
  } else {
    window.location.href = "index.html";
  }

  fetchProducts(title, catagory);
}

//Add Cart
function addCart() {
  let item = this.parentElement.parentElement;
  let itemTitle = item
    .querySelector(".card-body")
    .querySelector(".card-title").innerHTML;

  console.log(itemTitle);

  let itemFilterData = dataList.filter((data) => itemTitle == data.name);

  addToLocalStorage(itemFilterData);
}
function addCartFunction() {
  let itemTitle = this.parentElement.parentElement.parentElement.parentElement
    .querySelector(".title.text-dark")
    .innerHTML.trim();

  let itemFilterData = dataList.filter((data) => itemTitle == data.name);

  itemFilterData[0].qty = qtyValue ? qtyValue : 1;

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

function checkCartBasket() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];

  cartBasket = [];

  storeData.forEach((item) => {
    cartBasket.push(item[0].name);
  });
}

//Redirect to http://127.0.0.1:5500/singelProduct.html
function getItem(data) {
  let itemTitle = data.parentElement.querySelector(".card-title").innerHTML;

  let oneItem = dataList.filter((item) => item.name == itemTitle);

  localStorage.setItem("oneProduct", JSON.stringify(oneItem));

  window.location.href = "singelProduct.html";
}

function changeImg() {
  let mainImg = document.querySelector(".rounded-4.mainImg.fit");

  let imgSrc = this.getAttribute("src");
  mainImg.setAttribute("src", imgSrc);
}
function changeImg1() {
  let mainImg = document.querySelector(".rounded-4.mainImg.fit");

  mainImg.setAttribute("src", singelitem[0].img);
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }

  console.log(this.innerHTML);
}

function loginPage() {
  const LoginData = JSON.parse(localStorage.getItem("LoginData")) || [];
  if (LoginData.username) {
    if (confirm("Are Your Sure to LogOut")) {
      login.classList.remove("rounded-5");
      login.innerHTML = "Login";
      localStorage.removeItem("LoginData");
    }
  } else {
    window.location.href = "login.html";
  }
}
function displayLoginStatus() {
  const LoginData = JSON.parse(localStorage.getItem("LoginData")) || [];

  if (LoginData.username) {
    login.innerHTML = LoginData.username.charAt(0).toUpperCase();
    login.classList.add("rounded-5");
  } else {
    login.classList.remove("rounded-5");
    login.innerHTML = "Login";
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
displayCartCount();
displayLoginStatus();
