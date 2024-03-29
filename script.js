// This part for show menu in mobile
var minuButton = document.getElementById('minuButton');
var minu = document.getElementById('minu');
var minuViewCounter = 1;
function minuView(ele) {
    if (document.getElementById('header').offsetWidth < 767) {
        minuViewCounter++;
        if ((minuViewCounter % 2) === 0) {
            minu.style.transform = "translateX(0px)";
            ele.children[0].className = 'fa-solid fa-xmark change-color';
        } else {
            minu.style.transform = "translateX(-100%)";
            ele.children[0].className = 'fa-solid fa-bars change-color';
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
    if (IsDark) {
        landingText.src = `./images/home-text-${landingCounter}-dark.png`;
    }else{
        landingText.src = `./images/home-text-${landingCounter}-light.png`;
    }
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

// proflieIcon.onclick = () => {
//     profileContainer.style.display = "flex";
// }
// profileCloser.onclick = () => {
//     profileContainer.style.display = "none";
// }


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
    if(window.localStorage.hasfaved === "true"){
        document.getElementById('products').innerHTML = window.localStorage.faveProds ;
        faveList.innerHTML = window.localStorage.faveeeelistooo;
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
var hasFave = false;
// This function to get the clickedProd position in faveProd array
// And this function will be called everytime clicked on favorites icon
function clickedPord(element) {
    hasFave = true;
    window.localStorage.setItem('hasfaved', `${hasFave}`)
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
            <div id="prod-${favoritedProducts[index] + 1}" class="box change-box-background-color change-box-border-color">
                <div class="hover-items">
                    <i class="fa-solid fa-heart added" onclick="remove(this)" ></i>
                    <i class="fa-solid fa-share"></i>
                    <i class="fa-solid fa-eye"></i>
                </div>
                <img src="./images/product-${favoritedProducts[index] + 1}.png" alt="">
                <h4 class="change-color">Nike Shoes</h4>
                <span class="change-color">$120.99 <span>$150.99</span></span>
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <button onclick="OpenBuyFromFave(this);" class=" add-to-cart change-color change-box-background-color change-border-color">Add To Cart</button>
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
    window.localStorage.setItem('faveProds', `${document.getElementById('products').innerHTML}`);
    window.localStorage.setItem('faveeeelistooo', `${faveList.innerHTML}`);
}
// This part for remove products from favourites menu
function remove(element) {
    let removedProdNumber = element.parentNode.parentNode.id.slice(5);
    favorites[removedProdNumber - 1].classList.remove("FAVORITED");
    element.parentNode.parentNode.remove();
    if (faveList.childElementCount === 1) {
        faveList.innerHTML = `<p>Favorites menu in empty</p>`;
    }
    window.localStorage.setItem('faveProds', `${document.getElementById('products').innerHTML}`);
    window.localStorage.setItem('faveeeelistooo', `${faveList.innerHTML}`);
}
if(window.localStorage.hasfaved === "true"){
    document.getElementById('products').innerHTML = window.localStorage.faveProds ;
    setTimeout(() => {
        faveList.innerHTML = window.localStorage.faveeeelistooo;
    }, 1500);
}
// This function created by this JS file with (window.onload function)
function chageFeat(photo) {
    if (IsDark) {
        var x = photo.children[0].src;
        photo.parentElement.parentElement.children[1].src = x;
        for (let i = 0; i < photo.parentElement.children.length; i++) {
            photo.parentElement.children[i].classList.remove('active-dark');
            photo.parentElement.children[i].classList.remove('active-light');
        }
        photo.classList.add('active-dark');
    }else{
        var x = photo.children[0].src;
        photo.parentElement.parentElement.children[1].src = x;
        for (let i = 0; i < photo.parentElement.children.length; i++) {
            photo.parentElement.children[i].classList.remove('active-light');
            photo.parentElement.children[i].classList.remove('active-dark');
        }
        photo.classList.add('active-light');
    }
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
var hasInCart = false;
// this for know which type of products in byment methode
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
// to select size function
function selectSize(size) {
    for (let i = 0; i < size.parentElement.children.length; i++) {
        size.parentElement.children[i].classList.remove('activeSize')
    }
    for (let i = 1; i < size.parentElement.children.length; i++) {
        if (IsDark) {
            size.parentElement.children[i].style.color = 'whitesmoke'
        }else{
            size.parentElement.children[i].style.color = 'var(--main-black)'
        }
    }
    size.classList.add('activeSize')
    size.style.color = 'var(--main-orange)'
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
    <div class="prodBuoght change-background-color change-box-border-color">
        <div class="imageAndInfo">
            <img src="${buyingProdImage.src}" alt="">
            <div class="prodBoughtInfo">
                <span class="change-color">${prodName}</span>
                <span class="change-color">Size: ${sizeSelected}</span>
                <span class="change-color">Price: $${totalPrice} <span>${amountOnBayment.innerHTML}x $${prodPrice}</span></span>
            </div>
        </div>
        <i onmouseenter="mouseenterontrush(this)" onmouseleave="mouseleaveontrush(this)" class="fa-solid fa-trash-can change-color" id="remove-from-cart" onclick="removeFormCart(this)"></i>
    </div>
    `;
    totalPriceInCart += Number(totalPrice);
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
    hasInCart = true;
    window.localStorage.setItem('hasinCart', `${hasInCart}`);
    window.localStorage.setItem('totalPrice', `${totalPriceInCart.toFixed(2)}`)
    window.localStorage.setItem('cartlist', `${document.getElementById('cart-list').innerHTML}`);
}
var removedPrice = 0;
function removeFormCart(trash) {
    removedPrice = trash.parentElement.children[0].children[1].children[2].innerHTML.slice(8, 14);
    trash.parentElement.remove();
    totalPriceInCart -= Number(removedPrice);
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
    cartCounterChanger();
    
    
    window.localStorage.setItem('totalPrice', `${totalPriceInCart.toFixed(2)}`)
    window.localStorage.setItem('cartlist', `${document.getElementById('cart-list').innerHTML}`);
}
function ClearCart() {
    cartList.innerHTML = ``;
    totalPriceInCart = 0;
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}`;
    cartCounterChanger();
    
    window.localStorage.setItem('totalPrice', `${totalPriceInCart.toFixed(2)}`)
    window.localStorage.setItem('cartlist', `${document.getElementById('cart-list').innerHTML}`);
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
    window.localStorage.setItem('cartCount', `${cartCounter.innerHTML}`);
}

if (window.localStorage.hasinCart === 'true') {
    cartCounter.innerHTML = window.localStorage.cartCount ;
    document.getElementById('cart-list').innerHTML = window.localStorage.cartlist ;
    totalPriceInCart = Number(window.localStorage.totalPrice)
    document.getElementById('totalInCart').innerHTML = `<span style="color: var(--main-orange);">T</span >otal: $${totalPriceInCart.toFixed(2)}` ;
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

// Tihs part for make scroll to top buttom
document.getElementById('scroll-to-top').onclick =  () => {
    document.getElementById('scroll-to-top').style.display = 'none';
}

document.onscroll = () => {
    if (scrollY >= 1069.2000732421875) {
        document.getElementById('scroll-to-top').style.display = 'flex';
    }else{
        document.getElementById('scroll-to-top').style.display = 'none';
    }
}



// Dark mode
var IsDark = false;
const allColorChanges = document.getElementsByClassName('change-color');
const allBackgroundColorChanges = document.getElementsByClassName('change-background-color');
const hoveringItems = document.getElementsByClassName('hovering');
const allBorderColorChange = document.getElementsByClassName('change-border-color');
const allShadowsChange = document.getElementsByClassName('change-shadows');
const allBoxsBorder = document.getElementsByClassName('change-box-border-color');
const allBoxsBackgroundColor = document.getElementsByClassName('change-box-background-color');
const hoverButton = document.getElementsByClassName('hover-button');
const featSSelectors = document.getElementsByClassName('feat-image-selector');
const containerColor = document.getElementsByClassName('change-container-color');


if(window.localStorage.darkMode === 'ON'){
    IsDark = true;
    document.getElementById('display-mode').className = "fa-solid fa-sun change-color hovering";
    document.head.children[4].innerHTML = `
    ::-webkit-scrollbar-track {
        background-color: var(--main-dark);
        padding: 20px;
    }`;
    landingText.src = `./images/home-text-${landingCounter}-dark.png`;
    for (let i = 0; i < allColorChanges.length; i++) {
        allColorChanges[i].style.color = 'whitesmoke';
    }
    for (let i = 0; i < allBackgroundColorChanges.length; i++) {
        allBackgroundColorChanges[i].style.backgroundColor = 'var(--main-dark)';
    }
    for (let i = 0; i < allBorderColorChange.length; i++) {
        allBorderColorChange[i].style.borderColor = 'whitesmoke';
    }
    for (let i = 0; i < allShadowsChange.length; i++) {
        allShadowsChange[i].style.boxShadow = '0px 0px 5px 5px rgb(43, 43, 43)';
    }
    for (let i = 0; i < allBoxsBorder.length; i++) {
        allBoxsBorder[i].style.borderColor = '#777';
    }
    for (let i = 0; i < allBoxsBackgroundColor.length; i++) {
        allBoxsBackgroundColor[i].style.backgroundColor = '#272727';
    }
    for (let i = 0; i < featSSelectors.length; i++) {
        if(featSSelectors[i].classList.contains('active-light')){
            featSSelectors[i].classList.remove('active-light')
            featSSelectors[i].classList.add('active-dark')
        }
    }
    for (let i = 0; i < containerColor.length; i++) {
        containerColor[i].style.backgroundColor = 'rgb(51 51 51 / 82%)';
    }
}else{
    IsDark = false;
    document.getElementById('display-mode').className = "fa-solid fa-moon change-color hovering";
    document.head.children[4].innerHTML = `
    ::-webkit-scrollbar-track {
        background-color: white;
        padding: 20px;
    }`;
    landingText.src = `./images/home-text-${landingCounter}-light.png`;
    for (let i = 0; i < allColorChanges.length; i++) {
        allColorChanges[i].style.color = 'var(--main-black)';
    }
    for (let i = 0; i < allBackgroundColorChanges.length; i++) {
        allBackgroundColorChanges[i].style.backgroundColor = 'white';
    }
    for (let i = 0; i < allBorderColorChange.length; i++) {
        allBorderColorChange[i].style.borderColor = 'var(--main-black)';
    }
    for (let i = 0; i < allShadowsChange.length; i++) {
        allShadowsChange[i].style.boxShadow = '0px 0px 5px 5px whitesmoke';
    }
    for (let i = 0; i < allBoxsBorder.length; i++) {
        allBoxsBorder[i].style.borderColor = '';
    }
    for (let i = 0; i < allBoxsBackgroundColor.length; i++) {
        allBoxsBackgroundColor[i].style.backgroundColor = 'var(--main-gray)';
    }
    for (let i = 0; i < featSSelectors.length; i++) {
        if(featSSelectors[i].classList.contains('active-dark')){
            featSSelectors[i].classList.remove('active-dark')
            featSSelectors[i].classList.add('active-light')
        }
    }
    for (let i = 0; i < containerColor.length; i++) {
        containerColor[i].style.backgroundColor = 'rgba(255, 255, 255, 0.699)';
    }
}



function darkOrLight(){
    if (IsDark) {
        document.head.children[4].innerHTML = `
        ::-webkit-scrollbar-track {
            background-color: var(--main-dark);
            padding: 20px;
        }`;
        landingText.src = `./images/home-text-${landingCounter}-dark.png`;
        for (let i = 0; i < allColorChanges.length; i++) {
            allColorChanges[i].style.color = 'whitesmoke';
        }
        for (let i = 0; i < allBackgroundColorChanges.length; i++) {
            allBackgroundColorChanges[i].style.backgroundColor = 'var(--main-dark)';
        }
        for (let i = 0; i < allBorderColorChange.length; i++) {
            allBorderColorChange[i].style.borderColor = 'whitesmoke';
        }
        for (let i = 0; i < allShadowsChange.length; i++) {
            allShadowsChange[i].style.boxShadow = '0px 0px 5px 5px rgb(43, 43, 43)';
        }
        for (let i = 0; i < allBoxsBorder.length; i++) {
            allBoxsBorder[i].style.borderColor = '#777';
        }
        for (let i = 0; i < allBoxsBackgroundColor.length; i++) {
            allBoxsBackgroundColor[i].style.backgroundColor = '#272727';
        }
        for (let i = 0; i < featSSelectors.length; i++) {
            if(featSSelectors[i].classList.contains('active-light')){
                featSSelectors[i].classList.remove('active-light')
                featSSelectors[i].classList.add('active-dark')
            }
        }
        for (let i = 0; i < containerColor.length; i++) {
            containerColor[i].style.backgroundColor = 'rgb(51 51 51 / 82%)';
        }
    }else{
        document.head.children[4].innerHTML = `
        ::-webkit-scrollbar-track {
            background-color: white;
            padding: 20px;
        }`;
        landingText.src = `./images/home-text-${landingCounter}-light.png`;
        for (let i = 0; i < allColorChanges.length; i++) {
            allColorChanges[i].style.color = 'var(--main-black)';
        }
        for (let i = 0; i < allBackgroundColorChanges.length; i++) {
            allBackgroundColorChanges[i].style.backgroundColor = 'white';
        }
        for (let i = 0; i < allBorderColorChange.length; i++) {
            allBorderColorChange[i].style.borderColor = 'var(--main-black)';
        }
        for (let i = 0; i < allShadowsChange.length; i++) {
            allShadowsChange[i].style.boxShadow = '0px 0px 5px 5px whitesmoke';
        }
        for (let i = 0; i < allBoxsBorder.length; i++) {
            allBoxsBorder[i].style.borderColor = '';
        }
        for (let i = 0; i < allBoxsBackgroundColor.length; i++) {
            allBoxsBackgroundColor[i].style.backgroundColor = 'var(--main-gray)';
        }
        for (let i = 0; i < featSSelectors.length; i++) {
            if(featSSelectors[i].classList.contains('active-dark')){
                featSSelectors[i].classList.remove('active-dark')
                featSSelectors[i].classList.add('active-light')
            }
        }
        for (let i = 0; i < containerColor.length; i++) {
            containerColor[i].style.backgroundColor = 'rgba(255, 255, 255, 0.699)';
        }
    }
};
document.getElementById('display-mode').addEventListener("click", function () {
    if(this.className === "fa-solid fa-moon change-color hovering"){
        this.className = "fa-solid fa-sun change-color hovering";
        // now is dark mode
        IsDark = true;
        window.localStorage.setItem('darkMode', 'ON');
    }else{
        this.className = "fa-solid fa-moon change-color hovering";
        // now is light mode
        IsDark = false;
        window.localStorage.setItem('darkMode', 'OFF');
    }
    darkOrLight();
});

document.getElementById('cart-icon').addEventListener('click', function () {
    darkOrLight();
});

document.getElementById('by-and-go-to-cart').addEventListener('click', function () {
    darkOrLight();
});

// to active dark mode on items in fave menu after click on fave icon
document.getElementById('fave-icon').addEventListener("click", function () {
    darkOrLight();
});

for (let i = 0; i < hoveringItems.length; i++) {
    hoveringItems[i].onmouseenter = function () {
        this.style.color = 'var(--main-orange)';
    }
    hoveringItems[i].onmouseleave = function () {
        if (IsDark) {
            this.style.color = 'white';
        }else{
            this.style.color = 'var(--main-black)';
        }
    }
}

for (let i = 0; i < hoverButton.length; i++) {
    hoverButton[i].onmouseenter = function () {
        if (IsDark) {
            this.style.backgroundColor = 'var(--main-orange)';
            this.style.borderColor = 'var(--main-orange)';
        }else{
            this.style.backgroundColor = 'var(--main-orange)';
            this.style.color = 'white';
        }
    }
    hoverButton[i].onmouseleave = function () {
        if (IsDark) {
            this.style.backgroundColor = '#272727';
            this.style.borderColor = '#777';
        }else{
            this.style.backgroundColor = 'var(--main-gray)';
            this.style.color = 'var(--main-back)';
        }
    }
}

function mouseenterontrush(ele) {
    ele.style.color = 'var(--main-red)';
}
function mouseleaveontrush(ele) {
    if (IsDark) {
        ele.style.color = 'whitesmoke';
    }else{
        ele.style.color = 'var(--main-black)';
    }
}