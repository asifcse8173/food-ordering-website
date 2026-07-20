// ==========================================
// FOOD DATA
// ==========================================

const foods = [
    {
        id: 1,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 12,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
    },
    {
        id: 2,
        name: "Chicken Burger",
        category: "Burger",
        price: 80,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
    },
    {
        id: 3,
        name: "White Sauce Pasta",
        category: "Pasta",
        price: 11,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600"
    },
    {
        id: 4,
        name: "French Fries",
        category: "Fries",
        price: 5,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600"
    },
    {
        id: 5,
        name: "Cold Drink",
        category: "Drinks",
        price: 3,
        rating: 4.3,
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZclcpBrQOQu_8qOJ2oz76iUIniTcLJ8wQhMpp_DxcleW5Py8FqAVkTE&s=10"
    },
    {
        id: 6,
        name: "Chocolate Ice Cream",
        category: "Dessert",
        price: 6,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600"
    },
      {
        id: 7,
        name: "garlic pizza",
        category: "Pizza",
        price: 12,
        rating: 4.8,
        image: "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg"  

      },
       
      {
        id: 8,
        name: "classy cheese pizza",
        category: "Pizza",
        price: 12,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRMM9Xlu6V1paEldgle9o-DKklHppUUo_c2IdB4tS5Q&s=10"

      },
      {
        id: 9,
        name: "simple pizza",
        category: "Pizza",
        price: 12,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY_OvyIU-bYODsU_KE4b5BUkzTOPx-AohpSIfmVQlXDEq8Yot_OmgCbewW&s=10" 

      },
       {
        id: 9,
        name: "burger",
        category: "Burger",
        price: 60,
        rating: 4.8,
        image: "https://theeburgerdude.com/wp-content/uploads/2025/08/Veggie-Burger-2-1-scaled.jpg"

      },
        {
        id: 10,
        name: " Veg burger",
        category: "Burger",
        price: 70,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq39QJYMuVVYdrgg1up45yQgFZ7L4A_cVyezrgT1uBwlq6YwrRJiZK6dk&s=10"
      },
        {
        id: 11,
        name: "burger",
        category: "Burger",
        price: 80,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Ljxcf3-OrdjIn8KINylw8wsOJ9YWBwJWHrlWCrv1qg&s=10"

      },
       {
        id: 12,
        name: "soft drink",
        category: "Drinks",
        price: 80,
        rating: 4.8,
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Tumbler_of_cola_with_ice.jpg"
       },
      
       {
        id: 13,
        name: "masala cold drink",
        category: "Drinks",
        price: 80,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLaivJDrnWS2Q-F21x_Z7Dn5tSohayzrA0mS-tOHZBf1qGu8x1IQTopU&s=10"

      },
      
       {
        id: 14,
        name: " nimbu pani",
        category: "Drinks",
        price: 80,
        rating: 4.8,
        image: "https://vaya.in/wp-content/uploads/2021/04/Flavor-Infused-Water.jpg"

      },
       {
        id: 15,
        name: " white sauce 2 Pasta",
        category: "Pasta",
        price: 80,
        rating: 4.8,
        image: "https://www.cookwithkushi.com/wp-content/uploads/2016/07/best_white_sauce_pasta_bechamel_sauce-500x500.jpg"
      },
    
    ];
// ==========================================
// DOM ELEMENTS
// ==========================================

const foodGrid = document.querySelector(".food-grid");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories button");

// ==========================================
// DISPLAY FOOD
// ==========================================

function displayFoods(foodItems) {
// ==========================================
// CATEGORY FILTER
// ==========================================

        

   
    foodGrid.innerHTML = "";

    foodItems.forEach(food => {

        foodGrid.innerHTML += `
        <div class="food-card">

            <img src="${food.image}" alt="${food.name}">

            <div class="rating">
                ⭐ ${food.rating}
            </div>

            <h3>${food.name}</h3>

            <p>${food.category}</p>

            <span>₹${food.price}</span>

            <button onclick="addToCart(${food.id})">
                Add To Cart
            </button>

        </div>
        `;

    });

}

displayFoods(foods);
// ==========================================
// CATEGORY FILTER
// ==========================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.textContent.trim();

        if (category === "All") {

            displayFoods(foods);

        } else {

            const filteredFoods = foods.filter(food => food.category === category);

            displayFoods(filteredFoods);

        }

    });

});
// ==========================================
// LOCAL STORAGE CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id){

    const product = foods.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(product.name + " added to cart!");

}