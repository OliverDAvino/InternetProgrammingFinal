$(document).ready(async function () {
  await loadHeader();
  setupHeaderButtons();
  // later: setupLiveSearch();
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