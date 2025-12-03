let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = cart.length;
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    alert(name + " added to cart!");
}

/* ---------------------------
   PRODUCT DETAILS PAGE LOGIC
----------------------------- */
const productData = {
    "inter-miami": {
        name: "Inter Miami Jersey",
        price: 899,
        img: "https://raw.githubusercontent.com/mallika14-cyber/web-backup/refs/heads/main/images.jfif"
    },
    "ronaldo-nassr": {
        name: "Ronaldo Al Nassr Jersey",
        price: 999,
        img: "https://via.placeholder.com/300"
    },
    "india-cricket": {
        name: "India Cricket Jersey",
        price: 749,
        img: "https://via.placeholder.com/300"
    }
};

if (window.location.pathname.includes("product.html")) {
    const params = new URLSearchParams(window.location.search);
    const item = params.get("item");
    const data = productData[item];

    if (data) {
        document.getElementById("product-img").src = data.img;
        document.getElementById("product-name").textContent = data.name;
        document.getElementById("product-price").textContent = "₹" + data.price;
        document.getElementById("add-btn").onclick = () => addToCart(data.name, data.price);
    }
}

/* ---------------------------
   CART PAGE LOGIC
----------------------------- */
if (window.location.pathname.includes("cart.html")) {
    const container = document.getElementById("cart-items");
    const totalBox = document.getElementById("total");

    function renderCart() {
        container.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            `;

            container.appendChild(div);
            total += item.price;
        });

        totalBox.textContent = "Total: ₹" + total;
    }

    window.removeItem = function(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    };

    document.getElementById("clear-cart").onclick = function() {
        cart = [];
        saveCart();
        renderCart();
    };

    renderCart();
}

updateCartCount();
