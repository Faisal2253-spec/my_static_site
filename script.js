let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCart();
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
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove if quantity becomes 0
  }
  saveCart();
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();
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
}

// Load cart whenever page loads
window.onload = loadCart;