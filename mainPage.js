document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById("cartButton");
    console.log("Hi")

    if (cartButton) {
        cartButton.addEventListener("click", function() {
            window.location.href = "http://localhost/InternetProgrammingFinal/cart.html";
        });
    } else {
        console.error("Cart button not found!");
    }
});
  