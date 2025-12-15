$(document).ready(() => {

    $("#regForm").submit((e) => {
        e.preventDefault();

        if (checkPassword()){
            register();
            document.querySelector("#regForm").reset();
        }
    })
})

function register(){
    regInfo = {email: "eve.holt@reqres.in", password: $("#password").val()}

    $.ajax({
        method: "POST",
        url: "https://reqres.in/api/register",
        contentType: "application/json",
        headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
        data: JSON.stringify(regInfo),
        success: (r) => {
            document.cookie = "regToken=" + r.token // can make it so that it validates email and password
        },
        error: (err) => {console.log(err.responseText)}
    });
}

function checkPassword(){
    if ($("#password").val() == $("#passwordConf").val()){
        return true;
    }
    else{
        alert("The confirmation password did not match.");
        return false;
    }
}

function clearAll(){
    $("")
}