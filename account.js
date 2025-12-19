$(document).ready(() => {
    const token = document.cookie
        .split(";")
        .find(c => c.trim().startsWith("loginToken="))
        ?.split("=")[1];

    if (!token) {
        window.location.href = "login.html";
        return;
    }
    $("#userName").val(getCookieValue("regUsername"));
    $("#userEmail").val(getCookieValue("loginEmail"));
    saveEdits();
    setProfilePicture();
    setupLogOutButton();
});

function saveEdits(){
    $("#userName").change(() => {
        document.cookie = "regUsername=" + $("#userName").val();
    });

    $("#userEmail").change(() => {
        document.cookie = "loginEmail=" + $("#userEmail").val();
    });
}

function setupLogOutButton(){
    $("#logOutButton").click(() => {
        document.cookie = "loginToken=; max-age=-9999999";
        document.cookie = "loginEmail=; max-age=-9999999";
        window.location.href = "login.html";
    });
}

function setProfilePicture(){
    $.ajax({
        method: "GET",
        url: "https://reqres.in/api/users/1",
        contentType: "application/json",
        headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
        success: (r) => {
            console.log(r);
            $("#userAvatar").attr("src", r["data"].avatar);
        },
        error: (err) => {console.log(err.responseText)}
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

