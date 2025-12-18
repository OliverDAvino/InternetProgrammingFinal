$(document).ready(() => {
    const token = document.cookie
        .split(";")
        .find(c => c.trim().startsWith("loginToken="))
        ?.split("=")[1];

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // const name = getExpiration("name");
    // const email = getExpiration("email");

    // if (!name || !email) {
    //     alert("Session expired. Please log in again.");
    //     window.location.href = "login.html";
    //     return;
    // }

    // $("#userName").text(name);
    // $("#userEmail").text(email);
    $("#userAvatar").attr("src", "images/default-avatar.png");

    setupLogOutButton();
});

function setupLogOutButton(){
    $("#logOutButton").click(() => {
        document.cookie = "loginToken=; max-age=-9999999";
        window.location.href = "mainPage.html";
    });

    
}

// function getExpiration(key) {
//     const itemStr = localStorage.getItem(key);
//     if (!itemStr) return null;

//     const item = JSON.parse(itemStr);
//     const now = new Date();

//     if (now.getTime() > item.expiry) {
//         localStorage.removeItem(key);
//         return null;
//     }
//     return item.value;
// }
