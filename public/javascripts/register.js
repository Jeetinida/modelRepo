/* const button = document.getElementById('register');
button.addEventListener('click', function(e) {
    console.log('button was clicked');
}); */


function registerUser() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('psw');

    // AJAX Request
    console.log("AJAX STarts here")
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/registerUser",
        contentType: "application/json",
        // data: JSON.parse(JSON.stringify($("#add-report-form").serializeArray())),
        data: JSON.stringify({name: name.value, email: email.value, password: password.value}),
        // on a success we are redirecting it to dashboard page
        success: function(result){
            if(result.msg == "success") {
                localStorage.setItem("email", email.value);
                window.location.replace(result.url+"?name="+name.value);
            }
            else {
                window.location.replace('/');
            }
        }
    });
}