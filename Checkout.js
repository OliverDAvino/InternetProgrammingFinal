$(document).ready(() => {
    $("#checkoutForm").submit((e) => {
        e.preventDefault();
        if (validInput()){
            window.location.href = "orderConfirmation.html";
        }
    });

    $("#total").html("Total (Tax included): " + parseInt(getCookieValue("total")).toFixed(2) + "$");

    let cart = Object.values(JSON.parse(getCookieValue("cart")));
    cart.forEach((p) => {
        $("#summary").append(`<div class="item">${p.name} (${p.price}$) Qty: ${p.quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${(parseFloat(p.price)*parseInt(p.quantity)).toFixed(2)}$</div>`);
    });
});

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

function validInput(){
    // text inputs
    let inputs = [
        document.getElementById("fn"),
        document.getElementById("ln"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("shipping")
    ];

    // check phone number regex
    const phoneInput = document.getElementById("phone");
    const phoneRegex = /^(?:\d{10}|\d{3}[- ]\d{3}[- ]\d{4})$/;

    if (!phoneRegex.test(phoneInput.value.trim())) {
        alert("Invalid phone number! \nValid phone number formats: 5146642286, 514 664 2286, 514-664-2286.");
        phoneInput.focus();
        return false;
    }

    // check empty text inputs
    for (let input of inputs) {
        if (input.value.trim() == "") {
            alert("Please fill in all fields.");
            input.focus();
            return false;
        }
    }

    // check radio buttons
    let deliveryChecked = document.querySelector('input[name="delivery"]:checked');

    if (!deliveryChecked) {
        alert("Please select a delivery option.");
        return false;
    }

    return true;
}
