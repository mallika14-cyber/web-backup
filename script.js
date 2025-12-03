/* ===================================================
   MENU (mobile)
=================================================== */
function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}

/* ===================================================
   LOAD PRODUCT DATABASE
=================================================== */
let products = [];

fetch("products.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        loadTrending();
        loadShop();
        loadProductPage();
    });

/* ===================================================
   CART SYSTEM
=================================================== */
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.length;
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    saveCart();
    alert("Added to cart");
}

/* ===================================================
   HOMEPAGE: TRENDING
=================================================== */
function loadTrending() {
    const box = document.getElementById("trending-products");
    if (!box) return;

    const trending = products.slice(0, 4);
    box.innerHTML = trending.map(p => productCard(p)).join("");
}

/* ===================================================
   SHOP PAGE
=================================================== */
function loadShop() {
    const box = document.getElementById("shop-products");
    if (!box) return;

    box.innerHTML = products.map(p => productCard(p)).join("");

    const search = document.getElementById("search");
    if (!search) return;

    search.addEventListener("input", () => {
        box.innerHTML = products
            .filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
            .map(p => productCard(p))
            .join("");
    });
}

/* ===================================================
   PRODUCT CARD HTML
=================================================== */
function productCard(p) {
    return `
    <div class="product-card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <a class="details-btn" href="product.html?id=${p.id}">View Details</a>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`;
}

/* ===================================================
   PRODUCT PAGE
=================================================== */
function loadProductPage() {
    const box = document.getElementById("product-details");
    if (!box) return;

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));
    const p = products.find(p => p.id === id);

    if (!p) return;

    box.innerHTML = `
        <div class="details-container">
            <img src="${p.img}">
            <div class="info">
                <h1>${p.name}</h1>
                <p class="price">₹${p.price}</p>
                <button class="btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>`;
}

/* ===================================================
   CART PAGE
=================================================== */
function loadCartPage() {
    const box = document.getElementById("cart-list");
    if (!box) return;

    const totalBox = document.getElementById("cart-total");

    box.innerHTML = cart
        .map((p, i) => `
        <div class="cart-item">
            <p>${p.name} - ₹${p.price}</p>
            <button onclick="removeItem(${i})">Remove</button>
        </div>
    `).join("");

    const total = cart.reduce((acc, p) => acc + p.price, 0);
    totalBox.textContent = "Total: ₹" + total;
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    loadCartPage();
}

function clearCart() {
    cart = [];
    saveCart();
    loadCartPage();
}

updateCartCount();
loadCartPage();
