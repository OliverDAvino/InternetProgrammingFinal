document.addEventListener("DOMContentLoaded", (e) => {
    addAllProducts();
})

function addProduct(name, category, price, description, stock, imgId){
    var product = $("<div>").addClass("product"); // add on click product: show product page
    product.append(`Product Name: ${name}<br>`);
    product.append(`Categoty: ${category}<br>`);
    product.append(`Price: ${price}$<br>`);
    product.append(`Description: ${description}<br>`);
    if (imgId % 7 == 0){
        var imgUrl = "https://picsum.photos/200/300?random=" + imgId;
    }
    else{
        var imgUrl = "https://picsum.photos/200/300?random=" + (imgId - (imgId%7));
    }
    product.append(`<img src="${imgUrl}" alt="Random image"><br>`);
    product.append(`Stock: ${stock}<br>`);

    return product;
}


async function addAllProducts(){
    var products = $("#products");

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    console.log(category);
    if (category == "Home" || category == null){
        var allProducts = await fetch("data/products.json").then(r => r.json());
    }
    else{
        var allProducts = await fetch(`data/${category}.json`).then(r => r.json());
    }

    allProducts.forEach(p => {
        products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id));
    });
}

function clear(){
    $("#products").html("");
}