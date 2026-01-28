let cart = JSON.parse(localStorage.getItem('megamall_cart') || '[]');

const cartItems = document.getElementById('cartItems');
const subTotalEl = document.getElementById('subTotal');
const shipTotalEl = document.getElementById('shipTotal');
const taxTotalEl = document.getElementById('taxTotal');
const grandTotalEl = document.getElementById('grandTotal');

function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${p.src}">
      <div>
        <strong>${p.name}</strong><br>
        $${p.price}
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${p.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
        <a href="#" onclick="removeItem(${i})">Delete</a>
      </div>
      <strong>$${p.price * p.qty}</strong>
    `;

    cartItems.appendChild(div);
  });

  calculate();
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty < 1) cart[i].qty = 1;
  save();
}

function removeItem(i) {
  cart.splice(i,1);
  save();
}

function save() {
  localStorage.setItem('megamall_cart', JSON.stringify(cart));
  renderCart();
}

function calculate() {
  let sub = cart.reduce((a,b)=>a+b.price*b.qty,0);
  let ship = Number(document.querySelector('input[name="ship"]:checked').value);
  let tax = Math.round(sub * 0.07);

  subTotalEl.textContent = '$' + sub;
  shipTotalEl.textContent = '$' + ship;
  taxTotalEl.textContent = '$' + tax;
  grandTotalEl.textContent = '$' + (sub + ship + tax);
}

document.querySelectorAll('input[name="ship"]').forEach(r=>{
  r.onchange = calculate;
});

document.getElementById('placeOrderBtn').onclick = () => {
  alert('Order placed successfully!');
  localStorage.removeItem('megamall_cart');
  location.href = 'mall.html';
};

renderCart();
