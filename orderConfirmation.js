$(document).ready(() => {
    $("#orderNumber").html("Order number: " + (Math.floor(Math.random()*8999999999999 + 1000000000000)));

    showOrder();
    deleteCookies();
});

function showOrder(){
    $("#total").html("Total (Tax included): " + parseInt(getCookieValue("total")).toFixed(2) + "$");


    let cart = Object.values(JSON.parse(getCookieValue("cart")));
    cart.forEach((p) => {
        $("#summary").append(`<div class="item">${p.name} (${p.price}$) Qty: ${p.quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${(parseFloat(p.price)*parseInt(p.quantity)).toFixed(2)}$</div>`);
    });
}

function deleteCookies(){
    document.cookie = "cartAmt=; max-age=-99999";
    document.cookie = "cart=; max-age=-99999";
    document.cookie = "total=; max-age=-99999";
    document.cookie = "cartAmt=; max-age=-99999";
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