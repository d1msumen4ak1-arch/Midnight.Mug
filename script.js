// Produk awal
let products = [
  
  {name: "Cappuccino", price: 25000, desc: "Espresso dengan susu hangat dan busa lembut", img: "cappuccino.jpg"},
  {name: "Red velvet cake", price: 28000, desc: "Kue red velvet lembut dengan cream cheese frosting.", img: "velvet-cake.jpg"},
  {name: "Latte Caramel", price: 25000, desc: "Latte manis dengan sirup caramel spesial.", img: "latte-caramel.jpg"},
  {name: "Cheesecake", price: 25000, desc: "Cheesecake lembut dengan rasa manis seimbang.", img: "cheesake.jpg"},
  {name: "Taro Latte", price: 22000, desc: "Latte taro ungu lembut dan creamy.", img: "taro-latte.jpg"},
  {name: "Croissant Butter", price: 18000, desc: "Croissant renyah dengan butter harum.", img: "croissant-butter.jpg"},
  {name: "Vanilla Cold Brew", price: 28000, desc: "Kopi cold brew dengan vanilla.", img: "vanilla.jpg"},
  {name: "Mango Smoothie", price: 24000, desc: "Smoothie mangga segar alami.", img: "mango.jpg"},
  {name: "Waffle Ice Cream", price: 30000, desc: "Waffle hangat dengan es krim lembut.", img: "waffle.jpg"}
];

let cart = [];

// Navigasi
function hideAll() {
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
}

function goHome() {
  hideAll();
  document.getElementById("homePage").classList.remove("hidden");
}

function showMenu() {
  hideAll();
  document.getElementById("menuPage").classList.remove("hidden");
  renderMenu();
}

function showAddMenu() {
  hideAll();
  document.getElementById("addMenuPage").classList.remove("hidden");
}

function showCart() {
  hideAll();
  document.getElementById("cartPage").classList.remove("hidden");
  renderCart();
}

function showCheckout() {
  hideAll();
  document.getElementById("checkoutPage").classList.remove("hidden");
}

// Render Menu
function renderMenu() {
  let menuList = document.getElementById("menuList");
  menuList.innerHTML = "";
  products.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><strong>Rp ${p.price}</strong></p>
      <button onclick="addToCart(${i})">Tambah ke Keranjang</button>
    `;
    menuList.appendChild(div);
  });
}

// Tambah ke Keranjang
function addToCart(i) {
  cart.push(products[i]);
  document.getElementById("cartCount").innerText = cart.length;
  alert(products[i].name + " ditambahkan ke keranjang!");
}

// Render Keranjang
function renderCart() {
  let cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  cart.forEach((c, i) => {
    let li = document.createElement("li");
    li.textContent = `${c.name} - Rp ${c.price}`;
    cartItems.appendChild(li);
  });
}

// Form Tambah Menu
document.getElementById("addMenuForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("menuName").value;
  let price = parseInt(document.getElementById("menuPrice").value);
  let desc = document.getElementById("menuDesc").value;
  let imageFile = document.getElementById("menuImage").files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      products.push({
        name: name,
        price: price,
        desc: desc,
        img: event.target.result
      });
      alert("Menu baru berhasil ditambahkan!");
      showMenu();
    };
    reader.readAsDataURL(imageFile);
  }
});

// Checkout
document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("custName").value;
  let address = document.getElementById("custAddress").value;
  let payment = document.getElementById("paymentMethod").value;

  hideAll();
  document.getElementById("confirmPage").classList.remove("hidden");
  document.getElementById("orderDetails").innerText =
    `Atas nama ${name}, alamat ${address}, pembayaran via ${payment}`;
  document.getElementById("payCode").innerText = "MM-" + Math.floor(Math.random()*1000000);

  cart = [];
  document.getElementById("cartCount").innerText = 0;
});
