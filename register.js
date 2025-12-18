$(document).ready(() => {

    $("#regForm").submit((e) => {
        e.preventDefault();

        if (checkPassword()){
            register();
        }
    })
})

function register(){
    const name = $("#name").val();
    const password = $("#password").val();
    regInfo = {email: "eve.holt@reqres.in", password: password}

    $.ajax({
        method: "POST",
        url: "https://reqres.in/api/register",
        contentType: "application/json",
        headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
        data: JSON.stringify(regInfo),
        success: (r) => {
            document.cookie = "regUsername=" + name;

            document.cookie = "regToken=" + r.token + ";path=/"; // can make it so that it validates email and password
            window.location.href = "login.html";
        }
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