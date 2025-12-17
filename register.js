$(document).ready(() => {

    $("#regForm").submit((e) => {
        e.preventDefault();

        if (checkPassword()){
            register();
        }
    })
})

function register(){
    const name = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    regInfo = {email: email, password: password}

    $.ajax({
        method: "POST",
        url: "https://reqres.in/api/register",
        contentType: "application/json",
        headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
        data: JSON.stringify(regInfo),
        success: (r) => {
            const twoWeeks = 14 * 24 * 60 * 60 * 1000;
            setWithExpiry("name", name, twoWeeks);
            setWithExpiry("email", email, twoWeeks);

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

function clearAll(){
    $("")
}

function setExpiration(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getExpiration(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}