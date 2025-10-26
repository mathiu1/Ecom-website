const cartCount = document.querySelector("#cartCount");
const password = document.querySelector("#password");
const Cpassword = document.querySelector("#confirmPassword");
const showPass = document.querySelector("#showPass");
const showCPass = document.querySelector("#showCPass");
const state = document.querySelector("#State");
const District = document.querySelector("#District");

const fName = document.querySelector("#fName");
const form = document.querySelector("#form");
const Gender = document.querySelector("#Gender");
const phone = document.querySelector("#phoneNumber");
const address=document.querySelector("#address");
const State=document.querySelector("#State");
const district=document.querySelector("#District");
const pincode=document.querySelector("#pincode");
const agree=document.querySelector("#agree");

const genPass=document.querySelector("#genPass");

let pass = true;
let statesData;

let fullName = false;
let pass1=false;
let phoneNo=false;
let address1=false;
let State1=false;
let pincode1=false;
let agree1=false;


District.disabled = true; 

//fecth local storage data function
function fetchLocalData() {
  const storeData = JSON.parse(localStorage.getItem("cartData")) || [];

  if (storeData.length > 0) {
    cartCount.innerHTML = ` <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
            >
            ${storeData.length}  
            </span>`;
  }

  return storeData;
}

function loginPage() {
  window.location.href = "login.html";
}

showPass.addEventListener("click", function () {
  if (pass) {
    password.setAttribute("type", "text");
    showPass.classList.remove("bi-eye-slash");
    showPass.classList.add("bi-eye");
    pass = false;
  } else {
    password.setAttribute("type", "password");
    showPass.classList.remove("bi-eye");
    showPass.classList.add("bi-eye-slash");
    pass = true;
  }
});

showCPass.addEventListener("click", function () {
  if (pass) {
    Cpassword.setAttribute("type", "text");
    showCPass.classList.remove("bi-eye-slash");
    showCPass.classList.add("bi-eye");
    pass = false;
  } else {
    Cpassword.setAttribute("type", "password");
    showCPass.classList.remove("bi-eye");
    showCPass.classList.add("bi-eye-slash");
    pass = true;
  }
});


genPass.addEventListener("click", function () {

  let chars = "0123456789abcdefghijklmnopqrstuvwxtzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"

let passwordLength = 16;
let pass="";

for (var i=0; i<passwordLength; i++){
  var randomNumber = Math. floor(Math. random() *chars.length);
  pass += chars.substring(randomNumber, randomNumber+1);
}

password.value=pass;
Cpassword.value=pass;
});
//States Data Fetch Function
async function loadStatesData() {
  try {
    const response = await fetch("../data/states.json");
    const data = await response.json();
    statesData = data;

    data.states.forEach((value) => {
      State.appendChild(createOption(value.state, value.state));
    });

    //Create New Option Tag With Value
    function createOption(displayMember, valueMember) {
      const newOption = document.createElement("option");
      newOption.value = valueMember;
      newOption.text = displayMember;
      return newOption;
    }

    State.addEventListener("change", function (e) {
      District.disabled = false;
      data.states.forEach((detail, index) => {
        if (detail.state == e.target.value) {
          District.innerHTML = "";
          District.append(createOption("Select District", ""));
          data.states[index].districts.forEach((district) => {
            District.append(createOption(district, district));
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();


if(checkFname() && checkPassword() && checkPhone() && checkAddrass() && checkState() && checkPincode() && checkAgree() ){
  
  let loginData={
    username:fName.value,
    password:password.value,
    phone:phone.value,
    address:address.value,
    state:State.value,
    district:district.value,
    pincode:pincode.value
  }
  

  localStorage.setItem("LoginData", JSON.stringify(loginData));

 window.location.href = "index.html";
}

});

function checkFname() {
  if (fName.value.trim() == "") {
    fName.classList.add("is-invalid");
    fullName = false;
    fName.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Full Name";
    return false;
  } else if (fName.value.trim().length <= 5) {
    fName.classList.add("is-invalid");
    fullName = false;
    fName.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter More Then 5 Charater";
    return false;
  } else if (fName.value.trim().length >= 20) {
    fName.classList.add("is-invalid");
    fullName = false;
    fName.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Less Then 20 Charater";
    return false;
  } else {
    fName.classList.remove("is-invalid");
    fullName = true;
    return true;
  }
}

function checkPassword() {
  if (password.value.trim() == "") {
    password.parentElement.classList.add("is-invalid");
    password.parentElement.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Password ";
      pass1=false;
      return false;
  } else if (password.value.trim().length <= 5) {
    password.parentElement.classList.add("is-invalid");
    pass1=false;
    password.parentElement.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter More Then 5 Charater";
    return false;
  } else if (password.value.trim().length >= 20) {
    password.parentElement.classList.add("is-invalid");
    pass1=false;
    password.parentElement.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Less Then 20 Charater";
    return false;
  } else {
    password.parentElement.classList.remove("is-invalid");
    
    if(password.value.trim() == Cpassword.value.trim()){
      Cpassword.parentElement.classList.remove("is-invalid");
      return true;
    }else{
      Cpassword.parentElement.classList.add("is-invalid");
      pass1=false;
      Cpassword.parentElement.parentElement.querySelector(".invalid-feedback").innerHTML =
        "Password Can't Match ";

      return false;
    }
    
    
  }
}

function checkPhone(){

  if (phone.value.trim() == "") {
    phone.classList.add("is-invalid");
    phoneNo = false;
    phone.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Phone Number";
    return false;
  }else if (phone.value.trim().length == 10) {
    
    phoneNo = true;
    phone.classList.remove("is-invalid");
    return true;
  }else{
    phone.classList.add("is-invalid");
    phoneNo = false;
    phone.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter 10 digit Valid Phone Number";
    return false;
  }


}

function checkAddrass(){
  if (address.value.trim() == "") {
    address.classList.add("is-invalid");
    address1 = false;
    address.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Full Address";
    return false;
  } else if (address.value.trim().length <= 10) {
    address.classList.add("is-invalid");
    address1 = false;
    address.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter More Then 10 Charater";
    return false;
  }else {
    address.classList.remove("is-invalid");
    address1 = true;
    return true;
  }
}

function checkState() {

  if(State.value == "") {
    State.classList.add("is-invalid");
    State1 = false;
    State.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Select a State";
    return false;
  }
  else if(district.value == ""){
    district.classList.add("is-invalid");
    State1 = false;
    district.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Select a District";
    return false;
  }
  else{
    State.classList.remove("is-invalid");
    district.classList.remove("is-invalid");
    State1 = true;
    return true;
  }
}

function checkPincode(){
  if (pincode.value.trim() == "") {
    pincode.classList.add("is-invalid");
    pincode1 = false;
    pincode.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter Pincode";
    return false;
  }else if (pincode.value.trim().length == 6) {
    
    pincode1 = true;
    pincode.classList.remove("is-invalid");
    return true;
  }else{
    pincode.classList.add("is-invalid");
    pincode1 = false;
    pincode.parentElement.querySelector(".invalid-feedback").innerHTML =
      "Please Enter 6 digit Valid Pincode";
    return false;
  }
}

function checkAgree(){
  if(agree.checked){
    agree1 = true;
    agree.classList.remove("is-invalid");
    return true;
  }
  else{
    agree.classList.add("is-invalid");
    agree1 = false;
    agree.parentElement.querySelector(".invalid-feedback").innerHTML =
      "You must agree before submitting";
    return false;
  }
}
loadStatesData();

fetchLocalData();
