document.addEventListener("DOMContentLoaded", (e) => {
    addAllProducts();

    addSortChange();
    addMaxAndMinChange();

    document.getElementById("selections").addEventListener("click", () => {
      document.querySelector(".options").classList.toggle("active");
    });
})



function addProduct(name, category, price, description, stock, id, changeNum, sku){
    var product = $("<div>").addClass("product"); // add on click product: show product page
    var info = $("<div>").addClass("info");


    var imgUrl = "https://picsum.photos/200/300?random=" + (id - (id%changeNum));
    
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


async function addAllProducts(){
    var products = $("#products");

    var sort = $("#sort").val();

    var params = new URLSearchParams(window.location.search);
    var category = params.get('category');
    var search = params.get('search');

    var allProducts = await fetch(`data/${category}.json`).then(r => r.json());

    if (search != null){
        allProducts = await allProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    allProducts = allProducts.filter(product => $("#maxPriceRange").val() >= product.price && product.price >= $("#minPriceRange").val());

    if (sort == "asc"){
        await allProducts.sort((a, b) => a.price - b.price);
    }
    else{
        await allProducts.sort((a, b) => b.price - a.price);
    }

    await allProducts.forEach(p => {
        products.append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 67, p.sku));
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