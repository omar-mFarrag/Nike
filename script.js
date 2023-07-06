// This part for show menu in mobile
var minuButton = document.getElementById('minuButton');
var minu = document.getElementById('minu');
var minuViewCounter = 1;
function minuView() {
    if (document.getElementById('header').offsetWidth < 767) {
        minuViewCounter++;
        if ((minuViewCounter % 2) === 0) {
            minu.style.transform = "translateX(0px)";
            minuButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        } else {
            minu.style.transform = "translateX(-100%)";
            minuButton.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        }
    }
}





// This part for Animation in landing section
var landingCounter = 1;
var landingInfo = document.getElementById("landing-info");
var landingShoes = document.getElementById("landing-shoes");
var landingText = document.getElementById("landing-text");
var shoesColor = document.getElementById("shoes-color");
var landingShoesColors = ["Red", "Blue", "Yellow"];
var canChangeLanding = true;
function landingItemsChanger() {
    shoesColor.innerHTML = `Nike ${landingShoesColors[landingCounter - 1]} Shoes`;
    landingShoes.src = `./images/home-shoe-${landingCounter}.png`;
    landingText.src = `./images/home-text-${landingCounter}.png`;
}
function landingAnimations() {
    landingText.style.opacity = `0`;
    landingInfo.style.opacity = `0`;
    landingShoes.style.animation = `shoesSpin linear .4s`;
    setTimeout(() => {
        landingText.style.opacity = `1`;
        landingText.style.animation = `textDown linear .4s`;
    }, 400);
    setTimeout(() => {
        landingInfo.style.opacity = `1`;
        landingInfo.style.animation = `infoRight linear .4s`;
    }, 800);
    setTimeout(() => {
        landingShoes.style.animation = ``;
        landingText.style.animation = ``;
        landingInfo.style.animation = ``;
    }, 1200);
}
function nextLanding() {
    if (canChangeLanding) {
        canChangeLanding = false;
        landingCounter++;
        if (landingCounter > 3) {
            landingCounter = 1;
        }
        landingItemsChanger();
        landingAnimations();
        setTimeout(() => {
            canChangeLanding = true;
        }, 1250);
    }
}
function prevLanding() {
    if (canChangeLanding) {
        canChangeLanding = false;
        landingCounter--;
        if (landingCounter < 1) {
            landingCounter = 3;
        }
        landingItemsChanger();
        landingAnimations();
        setTimeout(() => {
            canChangeLanding = true;
        }, 1250);
    }
}





// This part for displaying favorites menu
var faveIcon = document.getElementById("fave-icon");
var faveList = document.getElementById("fave-list");
var browserWidth = document.getElementById('body').offsetWidth;
var faveCloser = document.getElementById('fave-list-closer');
const faveListContainer = document.getElementById('fave-list-container');
document.getElementById('fave-list-container').style.width = `${browserWidth}px`;

faveIcon.onclick = () => {
    faveListContainer.style.display = "flex";
    if (faveList.childElementCount === 0) {
        faveList.innerHTML = `<p>Favorites menu is empty</p>`;
    }
}
faveCloser.onclick = () => {
    faveListContainer.style.display = "none";
}

// This part for displaying Cart
var cartIcon = document.getElementById("cart-icon");
var cartList = document.getElementById("cart-list");
var browserWidth = document.getElementById('body').offsetWidth;
var cartCloser = document.getElementById('cart-closer');
const cartContainer = document.getElementById('cart-container');
document.getElementById('cart-container').style.width = `${browserWidth}px`;

cartIcon.onclick = () => {
    cartContainer.style.display = "flex";
}
cartCloser.onclick = () => {
    cartContainer.style.display = "none";
}

// This part for displaying Profile page
var proflieIcon = document.getElementById("profile-icon");
var profileCloser = document.getElementById('profile-closer');
const profileContainer = document.getElementById('profile-container');
document.getElementById('profile-container').style.width = `${browserWidth}px`;

proflieIcon.onclick = () => {
    profileContainer.style.display = "flex";
}
profileCloser.onclick = () => {
    profileContainer.style.display = "none";
}


// This part for add favourites product in favorites menu

var favorites = document.getElementsByClassName("fave"); //for get all favorites icons in array => favorites
var favoritesClassNames = []; //for storage favorites products class name in here
const faveProd = document.getElementsByClassName("box"); //for get all products in array => faveProd
var addToCart = document.getElementsByClassName("add-to-cart");// for get all add to cart button

// this function to add onclick event on all favorites icon to call ClickedProd function
var featSelector = document.getElementsByClassName('feat-image-selector');
window.onload = () => {
    for (let i = 0; i < favorites.length; i++) {
        favorites[i].setAttribute("onclick", "clickedPord(this)")
    }

    for (let i = 0; i < featSelector.length; i++) {
        featSelector[i].setAttribute("onclick", "chageFeat(this)")
    }
    for (let j = 0; j < addToCart.length; j++) {
        addToCart[j].setAttribute("onclick", "bayingProd(this);bayMethodOpen();")
    }
}

// This function to get every index for similar indexes in favoritesClassNames array 
function getAllIndexes(arr, val) {
    var favoritedProducts = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        favoritedProducts.push(i);
    }
    return favoritedProducts;
}
var favoritedProducts = [];
// This function to get the clickedProd position in faveProd array
// And this function will be called everytime clicked on favorites icon
function clickedPord(element) {
    element.classList.toggle("FAVORITED"); //To add or remove FAVORITED class name for each prodcut clicked on his favorites icon
    // This loop to add all favorites's classe name in favoritesClassNames array
    for (let i = 0; i < favorites.length; i++) {
        favoritesClassNames.push(favorites[i].className);
    }
    favoritedProducts = getAllIndexes(favoritesClassNames, "fa-solid fa-heart fave FAVORITED"); // To call getAllIndexes function
    faveList.innerHTML = `<div id="forPadding" style="width: 100%; background-color: white; z-index:-1;"></div>`; // VEREY important .... to remove all products in favorites menu in each click on favorites icon
    // This loop to added favorited products in favorites menu
    if (favoritedProducts.length > 0) {
        for (let index = 0; index < favoritedProducts.length; index++) {
            faveList.innerHTML += `
    
            <div id="prod-${favoritedProducts[index] + 1}" class="box">
                <div class="hover-items">
                    <i class="fa-solid fa-heart added" onclick="remove(this)" ></i>
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-solid fa-eye"></i>
                </div>
                <img src="./images/product-${favoritedProducts[index] + 1}.png" alt="">
                <h4>Nike Shoes</h4>
                <span>$120.99 <span>$150.99</span></span>
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <button onclick="OpenBuyFromFave(this);">Add To Cart</button>
            </div>
            `;
        }
    } else {
        faveList.innerHTML = `<p>Favorites menu in empty</p>`;
    }
    // to clear favoritesClassName afte each click in favorites icon
    for (let j = 0; j < favorites.length; j++) {
        favoritesClassNames.shift(favorites[j].className);
    }
}
// This part for remove products from favourites menu
function remove(element) {
    let removedProdNumber = element.parentNode.parentNode.id.slice(5);
    favorites[removedProdNumber - 1].classList.remove("FAVORITED");
    element.parentNode.parentNode.remove();
    if (faveList.childElementCount === 1) {
        faveList.innerHTML = `<p>Favorites menu in empty</p>`;
    }
}



// This function created by this JS file with (window.onload function)
function chageFeat(photo) {
    var x = photo.children[0].src;
    photo.parentElement.parentElement.children[1].src = x;
    for (let i = 0; i < photo.parentElement.children.length; i++) {
        photo.parentElement.children[i].classList.remove('active');
    }
    photo.classList.add('active');
}





// This for know which prod selected
var buyingProdImage = document.getElementById('bying-prod-image');
var buyingProdPrice = document.getElementById('price');
var buyingShoesName = document.getElementById('shoes-name');

var BuyingPrice = 0;
var BuyingOldPrice = 0;

var prodName = "";
var sizeSelected = 38;

var totalPrice = 0;
var totalPriceBeforDiscount = 0;

var cartCounter = document.getElementById('cart-counter');

function bayingProd(element) {
    if (element.value === 'nikeShoes') {
        buyingShoesName.innerHTML = `<span style="color: var(--main-orange);">N</span>ike <span style="color: var(--main-orange);">S</span>hoes`;
        buyingProdImage.src = element.parentElement.children[1].src;
        prodPrice = element.parentElement.children[3].innerHTML.slice(1, 7);
        prodOldPrice = element.parentElement.children[3].children[0].innerHTML.slice(1, 7);
        buyingProdPrice.innerHTML = `$${prodPrice} <span id="old-price">$${prodOldPrice}</span>`;

        BuyingPrice = buyingProdPrice.innerHTML.slice(1, 7);
        BuyingOldPrice = buyingProdPrice.children[0].innerHTML.slice(1, 7);

        totalPrice = 120.99;
        totalPriceBeforDiscount = 150.99;

        prodName = "Nike Shoes";
    } else if (element.value === 'airMax') {
        buyingShoesName.innerHTML = `<span style="color: var(--main-orange);">N</span>ike <span style="color: var(--main-orange);">A</span>irmax`;
        buyingProdImage.src = element.parentElement.parentElement.children[0].children[0].children[0].children[0].src;
        prodPrice = element.parentElement.children[0].children[3].innerHTML.slice(1, 6);
        prodOldPrice = element.parentElement.children[0].children[3].children[0].innerHTML.slice(1, 7);
        buyingProdPrice.innerHTML = `$${prodPrice} <span id="old-price">$${prodOldPrice}</span>`;

        BuyingPrice = buyingProdPrice.innerHTML.slice(1, 6);
        BuyingOldPrice = buyingProdPrice.children[0].innerHTML.slice(1, 7);

        totalPrice = 80.99;
        totalPriceBeforDiscount = 120.99;

        prodName = "Nike Airmax";
    }
}



// to select size funtion
function selectSize(size) {
    for (let i = 0; i < size.parentElement.children.length; i++) {
        size.parentElement.children[i].classList.remove('activeSize')
    }
    size.classList.add('activeSize')

    sizeSelected = size.innerHTML;
}
// To control amount
var amountOnBayment = document.getElementById("amount");
var amountMinusB = document.getElementById("amountMinus");
var amountOnBaymentCounter = 1;


function amountMinus() {
    if (amountOnBaymentCounter <= 1) {
        amountOnBaymentCounter = 1;
    } else {
        amountOnBaymentCounter--;
        amountOnBayment.innerHTML = amountOnBaymentCounter;
        buyingProdPrice.innerHTML = `$${(BuyingPrice * amountOnBaymentCounter).toFixed(2)} <span id="old-price">$${(BuyingOldPrice * amountOnBaymentCounter).toFixed(2)}</span>`;

        totalPrice = (BuyingPrice * amountOnBaymentCounter).toFixed(2);
        totalPriceBeforDiscount = (BuyingOldPrice * amountOnBaymentCounter).toFixed(2);

        console.log(totalPrice);
        console.log(totalPriceBeforDiscount);

    }
    if (amountOnBaymentCounter === 1) {
        amountMinusB.style.opacity = .5;
    }
}
function amountPlus() {
    amountOnBaymentCounter++;
    amountOnBayment.innerHTML = amountOnBaymentCounter;
    amountMinusB.style.opacity = 1;
    buyingProdPrice.innerHTML = `$${(BuyingPrice * amountOnBaymentCounter).toFixed(2)} <span id="old-price">$${(BuyingOldPrice * amountOnBaymentCounter).toFixed(2)}</span>`;

    totalPrice = (BuyingPrice * amountOnBaymentCounter).toFixed(2);
    totalPriceBeforDiscount = (BuyingOldPrice * amountOnBaymentCounter).toFixed(2);

    console.log(totalPrice);
    console.log(totalPriceBeforDiscount);
}


// This part for displaying Bay method
const baymentMethod = document.getElementById('by-method-container');
document.getElementById('by-method-container').style.width = `${browserWidth}px`;

// This function for close baymet method whene click on X mark
function bayMethodClose() {
    baymentMethod.style.display = "none";
    amountOnBaymentCounter = 1;
}
// those functions for handle actions in bayment method
document.getElementById('by-and-continuation').onclick = () => {
    baymentMethod.style.display = "none";
    amountOnBaymentCounter = 1;
    addProdInCart();
    cartCounterChanger();
}
document.getElementById('by-and-go-to-cart').onclick = () => {
    baymentMethod.style.display = "none";
    cartContainer.style.display = "flex";
    amountOnBaymentCounter = 1;
    addProdInCart();
    cartCounterChanger();
}
// This function for open batment method whene click on Add To Cart button
function bayMethodOpen() {
    baymentMethod.style.display = "flex";
    amountOnBayment.innerHTML = amountOnBaymentCounter;
    amountMinusB.style.opacity = .5;
}

var totalPriceInCart = 0;

function addProdInCart() {

    cartList.innerHTML +=
        `
    <div class="prodBuoght">
        <div class="imageAndInfo">
            <img src="${buyingProdImage.src}" alt="">
            <div class="prodBoughtInfo">
                <span>${prodName}</span>
                <span>Size: ${sizeSelected}</span>
                <span>Price: $${totalPrice} <span>${amountOnBayment.innerHTML}x $${prodPrice}</span></span>
            </div>
        </div>
        <i class="fa-solid fa-trash-can" onclick="removeFormCart(this)"></i>
    </div>
    `;

    totalPriceInCart += Number(totalPrice);

    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
}

var removedPrice = 0;
function removeFormCart(trash) {
    removedPrice = trash.parentElement.children[0].children[1].children[2].innerHTML.slice(8, 14);
    trash.parentElement.remove();
    totalPriceInCart -= Number(removedPrice);
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
    cartCounterChanger();

}

function ClearCart() {
    cartList.innerHTML = ``;
    totalPriceInCart = 0;
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
    cartCounterChanger();
}



function OpenBuyFromFave(element) {
    faveListContainer.style.display = "none";

    buyingShoesName.innerHTML = `<span style="color: var(--main-orange);">N</span>ike <span style="color: var(--main-orange);">S</span>hoes`;
    buyingProdImage.src = element.parentElement.children[1].src;
    prodPrice = element.parentElement.children[3].innerHTML.slice(1, 7);
    prodOldPrice = element.parentElement.children[3].children[0].innerHTML.slice(1, 7);
    buyingProdPrice.innerHTML = `$${prodPrice} <span id="old-price">$${prodOldPrice}</span>`;

    BuyingPrice = buyingProdPrice.innerHTML.slice(1, 7);
    BuyingOldPrice = buyingProdPrice.children[0].innerHTML.slice(1, 7);

    totalPrice = 120.99;
    totalPriceBeforDiscount = 150.99;

    prodName = "Nike Shoes";

    baymentMethod.style.display = "flex";
    amountOnBayment.innerHTML = amountOnBaymentCounter;
    amountMinusB.style.opacity = .5;
}

function cartCounterChanger() {
    cartCounter.innerHTML = cartList.children.length;
}





// Login page script
document.getElementById("login-page-container").style.width = `${browserWidth}px`;
var loginPageContainer = document.getElementById('login-page-container');
const loginWord = document.getElementById('login-word');
const signUpWord = document.getElementById('signUp-word');
const loginSignupContent = document.getElementById('login-signup-content');
const loginForm = document.getElementById('login-form');
const signUpForm = document.getElementById('signUp-form');
var loginActive = true;

// For display login methode
loginWord.onclick = () => {
    if (!loginActive) {
        loginWord.style.color = "var(--main-orange)";
        signUpWord.style.color = "var(--main-black)";
        loginWord.style.fontSize = "30px";
        signUpWord.style.fontSize = "15px";
        loginSignupContent.style.animation = "loginSignUp ease-in-out 1s";
        setTimeout(() => {
            loginForm.style.display = "flex";
            signUpForm.style.display = "none";
        }, 500);
        setTimeout(() => {
            loginSignupContent.style.animation = "";
        }, 1000);
        loginActive = true;
    }
}

// for display signUp methode
signUpWord.onclick = () => {
    if (loginActive) {
        loginWord.style.color = "var(--main-black)";
        signUpWord.style.color = "var(--main-orange)";
        loginWord.style.fontSize = "15px";
        signUpWord.style.fontSize = "30px";
        loginSignupContent.style.animation = "loginSignUp ease-in-out 1s";
        setTimeout(() => {
            loginForm.style.display = "none";
            signUpForm.style.display = "flex";
        }, 500);
        setTimeout(() => {
            loginSignupContent.style.animation = "";
        }, 1000);
        loginActive = false;
    }
}

// this script to change profile pic
var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
};
var chagePhoto = document.getElementById('chagePhoto');
const photo = document.getElementById('output');

// for change "add photo" to "Chage photo"
setInterval(() => {
    if (!(photo.src.includes('/images/profileTest.jpg'))) {
        chagePhoto.children[1].innerHTML = `change <br> Image`;
    }
}, 100);
chagePhoto.style.opacity = '1';
chagePhoto.onclick = () => {
    chagePhoto.style.opacity = '';
}




// access all inputs for signUp methode
const fristName = document.getElementById('frist-name');
const secondName = document.getElementById('second-name');
const signUpEmail = document.getElementById('signUp-email');
const signUpPassword = document.getElementById('signUp-password');
const signUpPhoneNumber = document.getElementById('signUp-phone-number');
var user = {}
const  profilePhoto = document.getElementById('image-in-profile');
const porfileUserName = document.getElementById('porfile-user-name');
const porfileEmail = document.getElementById('profile-email');
const porfilePhone = document.getElementById('profile-phone');

function signUp() {
    // make border bottom RED when try to signup with out fill it
    var signUpValidationCheck = [
        fristName,
        secondName,
        signUpEmail,
        signUpPassword,
        signUpPhoneNumber
    ]
    for (let i = 0; i < signUpValidationCheck.length; i++) {
        if (signUpValidationCheck[i].value === "") {
            signUpValidationCheck[i].style.borderBottom = "2px solid var(--main-red)";
        } else {
            signUpValidationCheck[i].style.borderBottom = "1px solid var(--main-orange)";
        }
    }

    // for do some thing in above but to email only
    if (
        !(signUpEmail.value.includes('@')) ||
        !(signUpEmail.value.includes('.com'))
    ) {
        signUpEmail.style.borderBottom = '2px solid var(--main-red)';
    }

    if (
        !(fristName.value === '') &&
        !(secondName.value === '') &&
        !(signUpEmail.value === '') &&
        (signUpEmail.value.includes('@',)) &&
        (signUpEmail.value.includes('.com')) &&
        !(signUpPassword.value === '') &&
        !(signUpPhoneNumber.value === '')
    ) {
        loginPageContainer.style.display = 'none';
    }

    var user = {
        photoSrc: photo.src,
        userName: `${fristName.value} ${secondName.value}`,
        email: signUpEmail.value,
        phoneNumber: signUpPhoneNumber.value
    };
    profilePhoto.src = `${user.photoSrc}`;
    porfileUserName.innerHTML = `
        <span style="color: var(--main-orange);">${user.userName[0]}</span>${user.userName.split(" ")[0].split(user.userName.split(" ")[0][0])[1]} <span style="color: var(--main-orange);">${user.userName.split(' ')[1][0]}</span>${user.userName.split(" ")[1].split(user.userName.split(" ")[1][0])[1]}
    `;
    porfileEmail.innerHTML = `
        <span style="color: var(--main-orange);">email</span>: ${user.email.split("@")[0]}<span style="color: var(--main-orange);">@</span>${user.email.split("@")[1]}
    `;
    porfilePhone.innerHTML = `
        <span style="color: var(--main-orange);">Phone Number</span>: ${user.phoneNumber}
    `;
}
// for remove any space in Frist or second name
setInterval(() => {
    nameValidArr = [
        fristName,
        secondName
    ]
    for (let i = 0; i < nameValidArr.length; i++) {
        if (nameValidArr[i].value.includes(' ')) {
            nameValidArr[i].value = nameValidArr[i].value.split(' ')[0];
        }
    }
}, 1);
