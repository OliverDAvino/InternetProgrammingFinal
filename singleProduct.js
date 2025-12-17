document.addEventListener("DOMContentLoaded", (e) => {
    addAllProducts();

    addSortChange();
    addMaxAndMinChange();
})



function addProduct(name, category, price, description, stock, imgId, changeNum){
    var product = $("<div>").addClass("product"); // add on click product: show product page
    var info = $("<div>").addClass("info");


    var imgUrl = "https://picsum.photos/200/300?random=" + (imgId - (imgId%changeNum));
    
    product.append(`<img src="${imgUrl}" alt="Random image">`);

    product.append(info);
    

    info.append(`Product Name: ${name}<br>`);
    info.append(`Categoty: ${category}<br>`);
    info.append(`Price: ${price}$<br>`);
    info.append(`Description: ${description}<br>`);
    info.append(`Stock: ${stock}<br>`);
    
    var button = $("<button>");
    product.append(button.html("Add to Cart"));

    addButtonEvent(button);

    return product;
}

function addButtonEvent(button){
    button.click(() => {
        var amt = getCartAmt();

        document.cookie = "cartAmt=" + (amt+1);

        
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
    document.cookie = "cart=";
    return 0;
}


async function addAllProducts(){
    var products = $("#products");

    var sort = $("#sort").val();

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var search = params.get('search');

    var allProducts = await fetch(`data/${category}.json`).then(r => r.json());

    if (search != null){
        allProducts = allProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    allProducts = allProducts.filter(product => $("#maxPriceRange").val() >= product.price && product.price >= $("#minPriceRange").val());

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


function clear(){
    $("#products").html("");
}

function addSortChange(){
    $("#sort").change(() => {
        clear();
        console.log()
        addAllProducts();
    })
}

function addMaxAndMinChange(){
    $("#maxPriceRange").change(() => {
        var val = $("#maxPriceRange").val();
        $("#minPriceRange").attr("max", val);
        $("#maxPriceValue").html(val + "$");
        clear();
        addAllProducts();
    });

    $("#minPriceRange").change(() => {
        var val = $("#minPriceRange").val();
        $("#maxPriceRange").attr("min", val);
        $("#minPriceValue").html(val + "$");
        clear();
        addAllProducts();
    });
}