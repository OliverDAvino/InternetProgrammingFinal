$(document).ready(() => {
    if (!getCookieValue("loginToken")){
        window.location.href = "login.html";
    }

    $("#checkoutButton").click(() => {
        window.location.href = "checkout.html";
    });

    displayCart();
    displayPrice();
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

function displayPrice(){

}


function displayCart() {
    $("#cartTotalText").html("Cart Total (" + getCookieValue("cartAmt") + " items)");

    let container = $('#cart');
    container.html("");

    cart = Object.entries(JSON.parse(getCookieValue("cart")));
    cart.forEach(item => {
        id = item[0];
        product = item[1];
        let input = $("<input>").attr({
            type: "number",
            id: "quantity",
            min: 1,
            max: 1000,
            value: product.quantity,
        });
        input.change(() => {
            let qt = parseInt($("#quantity").val());
            if (qt < 1){
                $("#quantity").val(1);
            }
            else if (qt > 1000){
                $("#quantity").val(100);
            }
        })

        let div = $("<div>").addClass("cart-item").append($("<img>").attr({src: `https://picsum.photos/id/${parseInt(id)%1084}/200/100`, alt:`${product.name}`}))
                                                  .append($("<h4>").html(product.name))
                                                  .append($("<p>").html("Price: " + product.price + "$"))
                                                  .append($("<p>").html("Quantity: ").append(input));
        
        let button = $("<button>");
        button.attr("value", id);
        button.html("Remove")
        addButtonEvent(button)

        div.append(button);
        container.append(div);
    });
}

function addButtonEvent(button){
    button.click(function () {
        let cart = JSON.parse(getCookieValue("cart"));
        delete cart[$(this).val()];
        document.cookie = "cart=" + JSON.stringify(cart);
        displayCart();
        displayPrice();
    })
}
