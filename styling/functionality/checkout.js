// ==========================================
// LOAD CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("order-items");
const subtotal = document.getElementById("subtotal");
const gst = document.getElementById("gst");
const total = document.getElementById("total");

const placeOrderBtn = document.getElementById("placeOrder");
const form = document.getElementById("checkoutForm");

// ==========================================
// DISPLAY ORDER
// ==========================================

function displayOrder() {

    orderItems.innerHTML = "";

    if (cart.length === 0) {

        orderItems.innerHTML = "<p>Your cart is empty.</p>";

        subtotal.innerHTML = "₹0.00";
        gst.innerHTML = "₹  0.00";
        total.innerHTML = "₹   0.00";

        return;
    }

    let subTotal = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subTotal += itemTotal;

        orderItems.innerHTML += `

        <div class="order-item">

            <div>

                <h4>${item.name}</h4>

                <p>Qty : ${item.quantity}</p>

            </div>

            <span>₹${itemTotal.toFixed(2)}</span>

        </div>

        `;

    });

    const gstAmount = subTotal * 0.05;
    const delivery = 3;
    const grandTotal = subTotal + gstAmount + delivery;

    subtotal.innerHTML = "₹" + subTotal.toFixed(2);
    gst.innerHTML = "₹ " + gstAmount.toFixed(2);
    total.innerHTML = "₹   " + grandTotal.toFixed(2);

}

displayOrder();

// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm() {

    const inputs = form.querySelectorAll("input, textarea");

    for (let input of inputs) {

        if (input.value.trim() === "") {

            alert("Please fill all fields.");

            input.focus();

            return false;

        }

    }

    return true;

}

// ==========================================
// PLACE ORDER
// ==========================================

placeOrderBtn.addEventListener("click", async () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    if (!validateForm()) {

        return;

    }

    // Customer Data

    const orderData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        city: document.getElementById("city").value,

        pincode: document.getElementById("pincode").value,

        cartItems: cart,

        subtotal: parseFloat(subtotal.innerText.replace("$", "")),

        gst: parseFloat(gst.innerText.replace("$", "")),

        total: parseFloat(total.innerText.replace("$", ""))

    };

    console.log(orderData);

    try {

        const response = await fetch("fetch("https://food-ordering-website-2u68.onrender.com/menu"), {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(orderData)

        });

        const data = await response.json();

        alert(data.message);

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});
