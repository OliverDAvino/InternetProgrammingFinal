$(document).ready(() => {
    $("#total").html("Total (Tax included): " + parseInt(getCookieValue("total")).toFixed(2) + "$");

    let cart = Object.values(JSON.parse(getCookieValue("cart")));
    console.log(cart);
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

function checkInput(){
    
}