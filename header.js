$(document).ready(() => {
    fetch("header.html").then(r => r.text())
                        .then(html => $("#header").html(html))
                        .then(() => {
                            $("#cartButton").click(() => {
                                console.log(1);
                                window.location.href = "cart.html";
                            })
                        });
})


