// Function to add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  calculateTotal(); // Update total after adding an item
}

// Function to display cart items
function displayCartItems() {
  const CartItems = document.querySelector(".cart-items");
  CartItems.innerHTML = ""; // Clear the cart before displaying

  const items = JSON.parse(localStorage.getItem("cart")) || [];
  items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">₹${item.price}</p>
      <button class="cart_delete" data-index="${index}">Delete</button>
    `;
    CartItems.appendChild(cartItem);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".cart_delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      deleteCartItem(index);
    });
  });
}

// Function to delete item from cart
function deleteCartItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  calculateTotal(); // Update total after deleting an item
}

// Function to calculate total price
function calculateTotal() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  items.forEach((item) => {
    total += parseFloat(item.price); // Ensure price is treated as a number
  });
  document.getElementById("total").textContent = `Total: ₹${total}`;
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll(".add_cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.getAttribute("data-id"),
      title: button.getAttribute("data-title"),
      image: button.getAttribute("data-image"),
      price: button.getAttribute("data-price"),
    };
    addToCart(product);
  });
});

// Initial display of cart items and total
displayCartItems();
calculateTotal();