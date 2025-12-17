document.addEventListener("DOMContentLoaded", (e) => {
    addAllProducts("desc");

    $("#sort").change(() => {
        clear();
        console.log($("#sort").val())
        addAllProducts($("#sort").val());

    })
})

function addProduct(name, category, price, description, stock, imgId, changeNum){
    var product = $("<div>").addClass("product"); // add on click product: show product page
    product.append(`Product Name: ${name}<br>`);
    product.append(`Categoty: ${category}<br>`);
    product.append(`Price: ${price}$<br>`);
    product.append(`Description: ${description}<br>`);
    if (imgId % changeNum == 0){
        var imgUrl = "https://picsum.photos/200/300?random=" + imgId;
    }
    else{
        var imgUrl = "https://picsum.photos/200/300?random=" + (imgId - (imgId%changeNum));
    }
    product.append(`<img src="${imgUrl}" alt="Random image"><br>`);
    product.append(`Stock: ${stock}<br>`);

    return product;
}


async function addAllProducts(sort){
    var products = $("#products");

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    if (category == "Home" || category == null){
        var allProducts = await fetch("data/products.json").then(r => r.json());

        
        if (sort == "asc"){
            allProducts.sort((a, b) => a.price - b.price);
        }
        else{
            allProducts.sort((a, b) => b.price - a.price);
        }

        allProducts.forEach(p => {
            products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 400));
        });
    }
    else{
        var allProducts = await fetch(`data/${category}.json`).then(r => r.json());

        if (sort == "asc"){
            allProducts.sort((a, b) => a.price - b.price);
        }
        else{
            allProducts.sort((a, b) => b.price - a.price);
        }

        allProducts.forEach(p => {
            products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 67));
        });
    }
}

function clear(){
    $("#products").html("");
}