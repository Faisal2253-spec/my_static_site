// script.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const existingProductIndex = cart.findIndex(item => item.name === productName);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

function loadCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> x ${item.quantity} - £${itemTotal.toFixed(2)}
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `<h3>Total: £${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);

  const checkoutButton = document.createElement('a');
  checkoutButton.href = `https://wa.me/44744397347?text=I%20would%20like%20to%20order%20the%20following:%20${encodeURIComponent(JSON.stringify(cart))}`;
  checkoutButton.classList.add('checkout-button');
  checkoutButton.innerText = 'Order on WhatsApp';
  cartContainer.appendChild(checkoutButton);
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

if (document.getElementById('cart-container')) {
  loadCart();
}
