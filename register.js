$(document).ready(() => {

    $("#loginButton").click(() => {
        loginInfo = {email: $("#email").val(), password: $("#password").val()}

        $.ajax({
		    method: "POST",
		    url: "https://reqres.in/api/login",
            contentType: "application/json",
		    headers: {"x-api-key": "reqres_f1ac177d9f6748d1924e2bdb8a2f312c"},
            data: JSON.stringify(loginInfo),
            success: (r) => {console.log(r)},
            error: (xhr) => {console.log(xhr.responseText)} 
		});
        
        // fetch('https://reqres.in/api/users', {
        // headers: { 'x-api-key': 'reqres_f1ac177d9f6748d1924e2bdb8a2f312c' }
        // })
        // .then(res => res.json())
        // .then(console.log)
        // .catch(console.error)
    })
})