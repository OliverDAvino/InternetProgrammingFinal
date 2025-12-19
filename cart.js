$(document).ready(() => {
    if (!getCookieValue("loginToken")){
        window.location.href = "login.html";
    }

    $("#checkoutButton").click(() => {
        window.location.href = "checkout.html";
    });

    displayCart();
})


function getCookieValue(cookieName){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        if (name.trim() == cookieName){
            return value;
        }
    }
    return 0;
}

// Display cart
function displayCart() {
    $("#cartTotalText").append(" (" + getCookieValue("cartAmt") + " items)");

    let container = $('#cart-container');
    cart = Object.entries(JSON.parse(getCookieValue("cart")));
    cart.forEach(item => {
        id = item[0];
        product = item[1];
        let div = $("<div>").addClass("cart-item").append($("<img>").attr({src: `https://picsum.photos/id/${id}/200/300`, alt:`${product.name}`}))
                                                  .append($("<h4>").html(product.name))
                                                  .append($("<p>").html("Price: " + product.price + "$"))
                                                  .append($("<p>").html("Quantity: " + product.quantity));
        let button = $("<button>");
        button.attr("id", id);
        addButtonEvent(button)
        // div.innerHTML = `
        //     <img src="${product.image}" alt="${product.name}">
        //     <h4>${product.name}</h4>
        //     <p>Price: $${product.price.toFixed(2)}</p>
        //     <p>Quantity: ${product.quantity}</p>
        //     <button onclick="removeFromCart(${product.id})">Remove</button>
        // `;
        container.append(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    container.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function addButtonEvent(button){
    button.click(() => {
        
    })
}
