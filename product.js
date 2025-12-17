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
    var info = $("<div>").addClass("info");

    if (imgId % changeNum == 0){
        var imgUrl = "https://picsum.photos/200/300?random=" + imgId;
    }
    else{
        var imgUrl = "https://picsum.photos/200/300?random=" + (imgId - (imgId%changeNum));
    }
    product.append(`<img src="${imgUrl}" alt="Random image"><br>`);
    
    product.append(info);
    

    info.append(`Product Name: ${name}<br>`);
    info.append(`Categoty: ${category}<br>`);
    info.append(`Price: ${price}$<br>`);
    info.append(`Description: ${description}<br>`);
    info.append(`Stock: ${stock}<br>`);
    
    product.append($("<button>").html("Add to Cart"));

    return product;
}


async function addAllProducts(sort){
    var products = $("#products");

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    if (category == "Products" || category == null){
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