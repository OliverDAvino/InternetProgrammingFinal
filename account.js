$(document).ready(() => {
    const token = document.cookie
        .split(";")
        .find(c => c.trim().startsWith("loginToken="))
        ?.split("=")[1];

    if (!token) {
        window.location.href = "login.html";
        return;
    }
    $("#userName").text(getCookieValue("regUsername"));
    $("#userEmail").text(getCookieValue("loginEmail"));
    $("#userAvatar").attr("src", "images/default-avatar.png");

    setupLogOutButton();
});

function setupLogOutButton(){
    $("#logOutButton").click(() => {
        document.cookie = "loginToken=; max-age=-9999999";
        document.cookie = "loginEmail=; max-age=-9999999";
        window.location.href = "login.html";
    });

}

function getCookieValue(cookieName){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        console.log(name);
        if (name.trim() == cookieName){
            return value;
        }
    }
}

