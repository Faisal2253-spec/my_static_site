let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart badge
function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge'); // Assume your cart badge has the class 'cart-badge'
  if (cartBadge) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Sum up the quantities
    cartBadge.textContent = cartCount; // Update the badge text
  }
}

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCart();
  updateCartBadge(); // Update the cart badge when an item is added
  alert(`${productName} added to cart!`);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return; // If we're not on cart page, exit

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>£${item.price.toFixed(2)}</td>
      <td>
        <button onclick="decreaseQuantity(${index})">-</button>
        ${item.quantity}
        <button onclick="increaseQuantity(${index})">+</button>
      </td>
      <td>£${itemTotal.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  document.getElementById('total').innerText = `Total: £${total.toFixed(2)}`;
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveCart();
  loadCart();
  updateCartBadge(); // Update the cart badge when quantity increases
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove if quantity becomes 0
  }
  saveCart();
  loadCart();
  updateCartBadge(); // Update the cart badge when quantity decreases
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
  updateCartBadge(); // Update the cart badge when an item is removed
}

function checkout() {
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  let message = "Hello! I'd like to order:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `${item.quantity} x ${item.name} (£${item.price.toFixed(2)} each)\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: £${total.toFixed(2)}`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/447443973437?text=${encodedMessage}`, '_blank');

  // Clear the cart after the order is placed
  cart = []; // Empty the cart array
  saveCart(); // Save the empty cart in localStorage
  loadCart(); // Reload the cart (this will show the empty cart)
  updateCartBadge(); // Update the cart badge when the cart is emptied
}

// Load cart whenever page loads
window.onload = function() {
  loadCart();
  updateCartBadge(); // Ensure the cart badge is updated when the page loads
};