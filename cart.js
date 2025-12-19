$(document).ready(() => {
    
})


function getCookieValue(cookieName){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        console.log(name);
        if (name.trim() == cookieName){
            return value;
        }
    }
    return false;
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
