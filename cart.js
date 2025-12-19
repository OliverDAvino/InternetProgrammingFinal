$(document).ready(() => {
    if (!getCookieValue("loginToken")){
        window.location.href = "login.html";
    }

    $("#checkoutButton").click(() => {
        window.location.href = "checkout.html";
    });

    display();
})

function display(){
    displayCartAmt();
    displayCart();
    displayPrice();
}

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
    let cart = Object.values(JSON.parse(getCookieValue("cart")));
    let total = 0;
    cart.forEach((product) => {
        total += parseFloat(product.price) * product.quantity;
    });

    let qst = total * 0.09975;
    let gst = total * 0.05;

    $("#subtotal").html(total.toFixed(2));
    $("#qst").html(qst.toFixed(2));
    $("#gst").html(gst.toFixed(2));
    $("#total").html((total + qst + gst).toFixed(2));
    
}

function displayCartAmt(){
    $("#cartTotalText").html("Cart Total (" + getCookieValue("cartAmt") + " items)");
}

function displayCart() {
    

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
            pid: id
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
        addNumInputEvent(input);

        div.append(button);
        container.append(div);
    });
}

function addButtonEvent(button){
    button.click(function () {
        let cart = JSON.parse(getCookieValue("cart"));
        let qty = cart[$(this).val()].quantity;
        delete cart[$(this).val()];
        document.cookie = "cart=" + JSON.stringify(cart);
        document.cookie = "cartAmt=" + (getCookieValue("cartAmt") - qty);
        display();
    })
}

function addNumInputEvent(input){
    input.change(function () {
        let qt = parseInt($(this).val());
        if (qt < 1){
            $("this").val(1);
        }
        else if (qt > 1000){
            $("this").val(1000);
        }
    });

    input.change(function () {
        let cart = JSON.parse(getCookieValue("cart"));
        let prevQty = cart[$(this).attr('pid')].quantity;
        cart[$(this).attr('pid')].quantity = input.val();
        
        document.cookie = "cart=" + JSON.stringify(cart);
        document.cookie = "cartAmt=" + (parseInt(getCookieValue("cartAmt")) + (input.val() -  prevQty));

        display();
    });
}
