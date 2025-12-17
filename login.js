$(document).ready(() => {

    $("#registerButton").click(() => {
        window.location.href = "register.html";
    })

    $("#loginForm").submit((e) => {
        e.preventDefault();

        login();
    })
})

function login(){
    loginInfo = {email: "eve.holt@reqres.in", password: $("#password").val()}

    $.ajax({
        method: "POST",
        url: "https://reqres.in/api/login",
        contentType: "application/json",
        headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
        data: JSON.stringify(loginInfo),
        success: (r) => {
            // if (r.token == getRegToken()){
            if (getRegToken()){
                document.cookie = "loginToken=" + r.token;
                window.location.href = "account.html"
            }
            else{
                alert("You need to register first.")
            }
        },
        error: (err) => {console.log(err.responseText)} 
    });
}

function getRegToken(){
    var cookies = document.cookie.split(";");
    for (var cookie of cookies){
        var [name, value] = cookie.split("=");
        if (name == "regToken"){
            return true;
        }
    }
}