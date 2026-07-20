// =====================================
// LOAD CART FROM LOCAL STORAGE
// =====================================


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");
const subtotalElement = document.getElementById("subtotal");
const gstElement = document.getElementById("gst");
const totalElement = document.getElementById("total");
const emptyCart = document.getElementById("empty-cart");

// =====================================
// DISPLAY CART ITEMS
// =====================================

function displayCart() {

    if (cart.length === 0) {

        document.querySelector(".cart-container").style.display = "none";
        emptyCart.style.display = "block";
        return;

    }

    cartList.innerHTML = "";

    cart.forEach((item) => {

        cartList.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="item-details">

                <h3>${item.name}</h3>

                <p>Rs${item.price}</p>

                <div class="quantity-box">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

                <button class="remove-btn"
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    calculateTotal();

}

// =====================================
// CALCULATE TOTAL
// =====================================

function calculateTotal() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    let delivery = 3;

    let gst = subtotal * 0.05;

    let total = subtotal + delivery + gst;

    subtotalElement.innerHTML = "₹  " + subtotal.toFixed(2);

    gstElement.innerHTML = "₹  " + gst.toFixed(2);

    totalElement.innerHTML = "₹   " + total.toFixed(2);

}

// =====================================
// SAVE CART
// =====================================





displayCart();
// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity++;

        saveCart();

    }

}

// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(id){

    const item = cart.find(product => product.id === id);

    if(item){

        if(item.quantity > 1){

            item.quantity--;

        }else{

            removeItem(id);

            return;

        }

        saveCart();

    }

}

// =====================================
// REMOVE ITEM
// =====================================

function removeItem(id){

    cart = cart.filter(product => product.id !== id);

    saveCart();

}

// =====================================
// CLEAR CART
// =====================================

function clearCart(){

    if(confirm("Are you sure you want to clear your cart?")){

        cart = [];

        saveCart();

    }

}

// =====================================
// CHECKOUT BUTTON
// =====================================

const checkoutBtn = document.getElementById("checkoutBtn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty!");

            return;

        }

        window.location.href="checkout.html";

    });

}

// =====================================
// OPTIONAL: CLEAR CART BUTTON
// =====================================

const clearBtn = document.createElement("button");

clearBtn.innerText="Clear Cart";

clearBtn.className="remove-btn";

clearBtn.style.marginTop="20px";

clearBtn.onclick=clearCart;

const summary=document.querySelector(".cart-summary");

if(summary){

    summary.appendChild(clearBtn);

}

// =====================================
// UPDATE CART COUNT (OPTIONAL)
// =====================================

function updateCartCount(){

    const count=document.getElementById("cart-count");

    if(count){

        let totalItems=0;

        cart.forEach(item=>{

            totalItems += item.quantity;

        });

        count.innerText=totalItems;

    }

}

updateCartCount();

// =====================================
// SAVE CART OVERRIDE
// =====================================

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    displayCart();

}

// =====================================
// INITIAL LOAD
// =====================================

displayCart();