const pathToProduct = "data/products.json"
const resultMax= 8;

let products = [];



$(document).ready(async function () {
    await loadHeader();
    setupHeaderButtons();
    setupLiveSearch();
    await loadProducts();
  


  //////////////

    $("a.category").click((e) => {
        e.preventDefault();
        var url = $(e.currentTarget).text();
        window.location.href = "product.html?category=" + encodeURIComponent(url);
    });
});

function isLoggedIn(){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        if (name.trim() == "loginToken"){
            return true;
        }
    }
    return false;
}

async function loadHeader() {
  const html = await fetch("header.html").then(r => r.text());
  $("#header").html(html);
}

function setupHeaderButtons() {
    $("div.logo").click(() => {
        window.location.href = "mainPage.html";
    });

    $("#cartButton").click(() => {
        window.location.href = "cart.html";
    });

    if (isLoggedIn()) $("#signOutButton").text("Account");

    $("#signOutButton").click(() => {
        if (isLoggedIn()){
            $("#signOutButton").text("Account");
            window.location.href = "account.html";
        }
        else{
            window.location.href = "login.html";
        }
    });
}

async function loadProducts() {
    try {
        const response = await fetch("data/products.json");
        products = await response.json();
    } catch (err) {
        console.error("Failed to load products:", err);
    }
}

function performSearch(query) {
    if (!query || !query.trim()) return;

    window.location.href = "product.html?category=Products&search=" + encodeURIComponent(query.trim());
}

function setupLiveSearch() {
    const searchBar = $("#searchBar");
    const searchButton = $("#searchButton");
    const results = $("#results");

    searchButton.on("click", () => {
        performSearch(searchBar.val());
    });

    searchBar.on("keydown", e => {
        if (e.key === "Enter") {
            performSearch(searchBar.val());
        }
    });

    searchBar.on("input", () => {
        updateLiveResults(searchBar.val(), results);
    });

    $(document).on("click", e => {
        if (!$(e.target).closest(".search-container").length) {
            results.empty().hide();
        }
    });
}

function updateLiveResults(query, results) {
    results.empty();

    if (!query) return;

    const matches = products
        .filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, resultMax);

    matches.forEach(product => {
        const $li = $(`
            <li class="search-result">
                <strong>${product.name}</strong>
                <span>$${product.price}</span>
            </li>
        `);

        $li.on("click", () => {
            performSearch(product.name);
        });

        results.append($li);
    });
    if(matches.length > 0){
      results.show();
    }
    else{
      results.hide();
    }
}