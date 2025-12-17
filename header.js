const pathToProduct = "data/products.json"
const resultMax= 8;

let products = [];



$(document).ready(async function () {
  await loadHeader();
  setupHeaderButtons();
  setupLiveSearch();
  await loadProducts();
});

async function loadHeader() {
  const html = await fetch("header.html").then(r => r.text());
  $("#header").html(html);
}

function setupHeaderButtons() {
  $("#cartButton").click(() => {
    window.location.href = "cart.html";
  });

  $("#signOutButton").click(() => {
    window.location.href = "login.html";
  });
}

async function loadProducts() {
    try {
        const response = await fetch("data/products.json");
        products = await response.json();
        console.log(products);
    } catch (err) {
        console.error("Failed to load products:", err);
    }
}

function performSearch(query) {
    if (!query || !query.trim()) return;

    window.location.href = "search.html?q=" + encodeURIComponent(query.trim());
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