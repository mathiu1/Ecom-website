document.addEventListener("DOMContentLoaded", loadFood);
const cartCount = document.querySelector("#cartCount");
const cartList = document.querySelector("#cartList");

const login= document.querySelector("#login");

function loadFood() {
  loadContent();
}

function loadContent() {
  displayCartCount();
  displayLoginStatus();
  let btnRemove = document.querySelectorAll(
    ".col-md-1.cartRemove.text-end.text-md-center.col-lg-1.col-xl-1.cursor_pointer.text-danger"
  );
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  //Product Item Change Event
  let qtyElements = document.querySelectorAll(
    ".form-control.qty.form-control-sm.text-center.mb-3"
  );

  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });
}

//Remove Item
function removeItem() {
  if (confirm("Are Your Sure to Remove")) {
    this.parentElement.parentElement.parentElement.remove();

    let removeItemTitle = this.parentElement.querySelector(
      ".lead.fw-normal.mb-2"
    ).innerHTML;
    let oldstoreData = fetchLocalData();

    let newStoreData = oldstoreData.filter(
      (item) => !(item[0].name == removeItemTitle)
    );

    localStorage.setItem("cartData", JSON.stringify(newStoreData));
    loadContent();
  }
}

//Change Quantity
function changeQty() {
  
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }

  let oldQtyItemTitle = this.parentElement.parentElement.querySelector(
    ".lead.fw-normal.mb-2"
  ).innerHTML;

  let oldstoreData = fetchLocalData();
  let updateQtyItem = oldstoreData.map((item) => {
    if (item[0].name == oldQtyItemTitle) {
      item[0].qty = this.value;
    }
    return item;
  });
  console.log(updateQtyItem);

  localStorage.setItem("cartData", JSON.stringify(updateQtyItem));
 

  loadContent();
}

// display cart item
function displayCartCount() {
  const storeData = fetchLocalData();
  if (storeData.length > 0) {
    cartCount.innerHTML = ` <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
        >
        ${storeData.length}  
        </span>`;
    let cart = "";
    let cartTotal = 0;
    storeData.forEach((item) => {
      cartTotal += item[0].amt * item[0].qty;
      cart += `<div class="card rounded-3 mb-4">
              <div class="card-body p-4">
                <div
                  class="row d-flex justify-content-between align-items-center"
                >
                  <div class="col-md-2 col-lg-2 col-xl-2">
                    <img
                      src="${item[0].img}"
                      class="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div class="col-md-3 col-lg-3 mt-2 col-xl-3">
                    <p class="lead fw-normal mb-2">${item[0].name}</p>
                    <p>
                      <span class="text-muted">Price : </span
                      ><svg
                        class="icon-height"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-currency-rupee"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"
                        /></svg
                      >${item[0].amt}
                    </p>
                  </div>
                  <div class="col-md-3 col-lg-3 col-xl-2 d-flex mt-3">
                    <input
                      id="form1"
                      min="1"
                      name="quantity"
                      value="${item[0].qty}"
                      type="number"
                      class="form-control  qty form-control-sm text-center mb-3"
                    />
                  </div>
                  <div class="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 class="mb-0">
                      <svg
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
                      >${Number(item[0].amt) * Number(item[0].qty)}
                    </h5>
                  </div>

                  <span
                    class="col-md-1 cartRemove text-end text-md-center col-lg-1 col-xl-1 cursor_pointer text-danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                      /></svg
                  ></span>
                </div>
              </div>
            </div>`;
    });

    cartList.innerHTML =
      cart +
      `<div class="card">
            <div
              class="card-body d-flex align-items-center justify-content-around"
            >
              <p class="fs-sm-6 fs-5 mt-2">
                Total :
                <span
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
                  >${cartTotal}</span
                >
              </p>

              <button
                type="button"
                class="btn btn-warning btn-block btn-sm-sm"
              >
                Proceed to Pay
              </button>
            </div>
          </div>`;
  } else {
    cartCount.innerHTML = "";
    cartList.innerHTML = `<div class="no-product-box"><div class="no-product">
          <img src="../img/empty-cart.png" alt="product-not-found">
      </div></div>`;
  }
}


//fecth local storage data function
function fetchLocalData() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];

  return storeData;
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

