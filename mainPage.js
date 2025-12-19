$(document).ready(() => {
    setTop5RatedProduct();
})

async function setTop5RatedProduct(){
    let reviews = await fetch("data/reviews.json").then(r => r.json());

    let top5rating = [0,0,0,0,0];
    let productsId = {};

    reviews.forEach(r => {
        let cnt = 0;
        let total = 0;
        r["reviews"].forEach(review => {
            cnt++;
            total += review["rating"];
        });
        let avg = total/cnt

        if (avg > top5rating[0]){
            top5rating[0] = avg;
            top5rating.sort((x, y) => x - y);

            if (productsId[avg] == undefined){
                productsId[avg] = [];
            }
            productsId[avg].push(r["product_id"]);
        }
    });

    let products = await fetch("data/Products.json").then(r => r.json());
    let top5Product = [];

    for (let i = 0; i < 5; i++){

        let ind = top5rating[i];

        let cnt = productsId[ind].length > (5-i) ? 5-i : productsId[ind].length;
        console.log(productsId[ind]);
        for (let j = 0; j < cnt; j++){
            i++;
            top5Product.push(products[productsId[ind][j]-1]);
        }

    }
    top5Product.forEach(p => {
        $("#products").append(addProduct(p.name, p.category, p.price, p.description, p.stock, p.id, 1, p.sku));
    });
}


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