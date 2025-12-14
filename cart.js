let products = [];
let cart = [];



// Cookie helper functions
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
        const [key, value] = c.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Load products from JSON
fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        loadCartFromCookies();
        displayProducts();
        displayCart();
    });

// Load cart from cookie
function loadCartFromCookies() {
    const cookieCart = getCookie('shoppingCart');
    if (cookieCart) {
        try {
            cart = JSON.parse(cookieCart);
        } catch(e) {
            cart = [];
        }
    }
}

// Save cart to cookie
function saveCartToCookies() {
    setCookie('shoppingCart', JSON.stringify(cart), 7); // 7 days
}

// Display products
function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartToCookies();
    displayCart();
}

// Display cart
function displayCart() {
    const container = document.getElementById('cart-container');
    container.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    container.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToCookies();
    displayCart();
}
