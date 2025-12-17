document.addEventListener("DOMContentLoaded", (e) => {
    addAllProducts();
})

function addProduct(name="", category="", price="", description="", stock=""){
    var product = $("<div>").addClass("product"); // add on click product: show product page
    product.append(`Product Name: ${name}<br>`);
    product.append(`Categoty: ${category}<br>`);
    product.append(`Price: ${price}$<br>`);
    product.append(`Description: ${description}<br>`);
    product.append(`<img src="https://picsum.photos/200/300" alt="Random image"><br>`);
    product.append(`Stock: ${stock}<br>`);

    return product;
}


async function addAllProducts(){
    var products = $("#products");

    var allProducts = await fetch("data/products.json").then(r => r.json());

    allProducts.forEach(p => {
        products.append(addProduct(p.name, p.category, p.price, p.description, p.stock));
    });
}

function clear(){
    $("#products").html("");
}