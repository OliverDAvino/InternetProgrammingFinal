$(document).ready(() => {
    fetch("footer.html").then(r => r.text())
                        .then(html => $("#footer").html(html))
})


