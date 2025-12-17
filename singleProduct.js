

document.addEventListener("DOMContentLoaded", (e) => {
    addProduct();

    var params = new URLSearchParams(window.location.search);
    addAllProducts(params.get("category"));
})


function addProduct(name, category, price, description, stock, imgId, changeNum, sku){
    if (name === undefined){
var params = new URLSearchParams(window.location.search);

    var name = params.get("name");
    var category = params.get("category");
    var sku = params.get("sku");
    var price = params.get("price");
    var description = params.get("description");
    var stock = params.get("stock");

    
    var info = $("<div>").addClass("info");
    
    var product = $("#singleProduct");

    var imgUrl = "https://picsum.photos/200/300";
    
    product.append(`<img src="${imgUrl}" alt="Random image">`);

    product.append(info);
    

    info.append(`Product Name: <div class="productName" value="${name}">${name}</div><br>`);
    info.append(`Category: <div class="category" value="${category}">${category}</div><br>`);
    info.append(`SKU: <div class="sku" value="${sku}">${sku}</div><br>`);
    info.append(`Price: <div class="price" value="${price}">${price}</div><br>`);
    info.append(`Description: <div class="description" value="${description}">${description}</div><br>`);
    info.append(`Stock: <div class="stock" value="${stock}">${stock}</div><br>`);
    
    var button = $("<button>");
    product.append(button.html("Add to Cart"));

    addButtonEvent(button);

    return product;
    }
    else{
        var product = $("<div>").addClass("product"); // add on click product: show product page
        var info = $("<div>").addClass("info");


        var imgUrl = "https://picsum.photos/200/300?random=" + (imgId - (imgId%changeNum));
        
        product.append(`<img src="${imgUrl}" alt="Random image">`);

        product.append(info);
        

        info.append(`Product Name: <div class="productName" value="${name}">${name}</div><br>`);
        info.append(`Category: <div class="category" value="${category}">${category}</div><br>`);
        info.append(`SKU: <div class="sku" value="${sku}">${sku}</div><br>`);
        info.append(`Price: <div class="price" value="${price}">${price}</div><br>`);
        info.append(`Description: <div class="description" value="${description}">${description}</div><br>`);
        info.append(`Stock: <div class="stock" value="${stock}">${stock}</div><br>`);

        addDivEvent(product);

        return product;
    }
}

function addButtonEvent(button){
    button.click(() => {
        var amt = getCartAmt();

        document.cookie = "cartAmt=" + (amt+1);

        var cart = getCart();

        var params = new URLSearchParams(window.location.search);

        var name = params.get("name");
        var price = params.get("price");

        var product = {
        name: name,
        price: price
        };

        cart.push(product);


        document.cookie = "cart=" + JSON.stringify(cart);

        
    });
}

function addDivEvent(product){
    product.click((e) => {
        var el = $(e.currentTarget);
            
        var url =
        `singleProduct.html?` +
        `name=${encodeURIComponent(el.find(".productName").attr("value"))}` +
        `&category=${encodeURIComponent(el.find(".category").attr("value"))}` +
        `&sku=${encodeURIComponent(el.find(".sku").attr("value"))}` +
        `&price=${encodeURIComponent(el.find(".price").attr("value"))}` +
        `&description=${encodeURIComponent(el.find(".description").attr("value"))}` +
        `&stock=${encodeURIComponent(el.find(".stock").attr("value"))}`;

        window.location.href = url;
    });
}

function getCartAmt(){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        console.log(name );
        if (name.trim() == "cartAmt"){
            return parseInt(value);
        }
    }
    document.cookie = "cartAmt=0";
    return 0;
}

function getCart(){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        console.log(name );
        if (name.trim() == "cart"){
            return JSON.parse(value);
        }
    }

    var arr = [];


    document.cookie = "cart=" + JSON.stringify(arr);
    return arr;
}


async function addAllProducts(category){
    var products = $("#products");

    var allProducts = await fetch(`data/${category}.json`).then(r => r.json());

    allProducts.forEach(p => {
        products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 67, p.sku));
    });
}


function clear(){
    $("#products").html("");
}
