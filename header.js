$(document).ready(() => {
    fetch("header.html").then(r => r.text())
                        .then(html => $("#header").html(html));

  
    $("#cartButton").click(() => {
        window.location.href = "cart.html";
    })
})


