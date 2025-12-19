

document.addEventListener("DOMContentLoaded", (e) => {
    addProduct();

    var params = new URLSearchParams(window.location.search);
    addReviews(params.get("id"));

    addAllProducts(params.get("category"));
});

async function addReviews(id){
    let reviews = await fetch("data/reviews.json").then(r => r.json());

    reviews = reviews[id-1].reviews;
    reviews.forEach(r => {
        $("#reviews").append($("<div>").addClass("review").append(`<h4>Title: ${r.title}</h4>`)
                                                          .append(`<p>User: ${r.user}\t\tRating: ${r.rating}</p>`)
                                                          .append(`<p>Comment: ${r.comment}</p>`));
    })
}

function addProduct(name, category, price, description, stock, id, changeNum, sku){
    if (name === undefined){
        var params = new URLSearchParams(window.location.search);

        var name = params.get("name");
        var category = params.get("category");
        var sku = params.get("sku");
        var price = params.get("price");
        var description = params.get("description");
        var stock = params.get("stock");
        var id = params.get("id");

        
        var info = $("<div>").addClass("info");
        
        var product = $("#singleProduct");

        var imgUrl = `https://picsum.photos/id/${parseInt(id)%1084}/200/300`;
        
        product.append(`<img src="${imgUrl}" alt="Random image">`);

        product.append(info);
        

        info.append(`Product Name: <div class="productName" value="${name}">${name}</div><br>`);
        info.append(`Category: <div class="category" value="${category}">${category}</div><br>`);
        info.append(`SKU: <div class="sku" value="${sku}">${sku}</div><br>`);
        info.append(`Price: <div class="price" value="${price}">${price}</div><br>`);
        info.append(`Description: <div class="description" value="${description}">${description}</div><br>`);
        info.append(`Stock: <div class="stock" value="${stock}">${stock}</div><br>`);
        info.append(`<div class="id" value="${id}"></div><br>`);

        let input = $("<input>").attr({
            type: "number",
            id: "quantity",
            min: 1,
            max: 100,
            value: 1,
        });
        input.change(() => {
            let qt = parseInt($("#quantity").val());
            if (qt < 1){
                $("#quantity").val(1);
            }
            else if (qt > 100){
                $("#quantity").val(100);
            }
        })
        info.append(input);
        var button = $("<button>");
        product.append(button.html("Add to Cart"));

        addButtonEvent(button);

        return product;
    }
    else{
        var product = $("<div>").addClass("product"); // add on click product: show product page
        var info = $("<div>").addClass("info");


        var imgUrl = `https://picsum.photos/id/${parseInt(id)%1084}/200/300`;
        
        product.append(`<img src="${imgUrl}" alt="Random image">`);

        product.append(info);
        

        info.append(`Product Name: <div class="productName" value="${name}">${name}</div><br>`);
        info.append(`Category: <div class="category" value="${category}">${category}</div><br>`);
        info.append(`SKU: <div class="sku" value="${sku}">${sku}</div><br>`);
        info.append(`Price: <div class="price" value="${price}">${price}</div><br>`);
        info.append(`Description: <div class="description" value="${description}">${description}</div><br>`);
        info.append(`Stock: <div class="stock" value="${stock}">${stock}</div><br>`);
        info.append(`<div class="id" value="${id}"></div><br>`);


        addDivEvent(product);

        return product;
    }
}

function addButtonEvent(button){
    button.click(() => {
        var params = new URLSearchParams(window.location.search);

        var id = params.get("id");
        var name = params.get("name");
        var price = params.get("price");

        var cart = getCart();

        let qty = parseInt($("#quantity").val());
        if (cart[id] == undefined){
            cart[id] = { 
                name: name,
                price: price,
                quantity: qty
            };
        }
        else{
            cart[id].quantity += qty;
        }

        document.cookie = "cartAmt=" + (getCartAmt() + qty);
        document.cookie = "cart=" + JSON.stringify(cart);

        alert("added to cart");
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
        `&stock=${encodeURIComponent(el.find(".stock").attr("value"))}` +
        `&id=${encodeURIComponent(el.find(".id").attr("value"))}`;

        window.location.href = url;
    });
}

function getCartAmt(){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
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
        if (name.trim() == "cart"){
            return JSON.parse(value);
        }
    }

    var dict = {};


    document.cookie = "cart=" + JSON.stringify(dict);
    return dict;
}


async function addAllProducts(category){
    var products = $("#products");

    var allProducts = await fetch(`data/${category}.json`).then(r => r.json());

    allProducts.forEach(p => {
        products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 1, p.sku));
    });
}


function clear(){
    $("#products").html("");
}
