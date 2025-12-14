$(document).ready(() => {

    $("#registerButton").click(() => {
        window.location.href = "register.html";
    })

    $("#loginButton").click(() => {
        // $.post("https://reqres.in/api/login", {
        //     email: "user@example.com",
        //     password: "123456"
        //     }, function (response) {
        //     console.log("Login success:", response);
        // });

        // $.ajax({
		//   method: "GET",
		//   url: "https://reqres.in/api/users?per_page=5",
		//   headers: {"x-api-key": "reqres-free-v1"}
		// })
		// .done(function(o){
        //     console.log("good");
		// 	$(o.data).each(function(index,element){
		// 	})

		// })
        
        fetch('https://reqres.in/api/users', {
        headers: { 'x-api-key': 'reqres_f1ac177d9f6748d1924e2bdb8a2f312c' }
        })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error)
    })
})