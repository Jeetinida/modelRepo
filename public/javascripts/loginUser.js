function loginUser(){
    const email = document.getElementById('email');
    const password = document.getElementById('psw');
    let loginMsg = document.getElementById("loginMsg");
    // ajax for login
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/loginUser",
        contentType: "application/json",
        // data: JSON.parse(JSON.stringify($("#add-report-form").serializeArray())),
        data: JSON.stringify({email: email.value, password: password.value}),
        // on a success we are redirecting it to dashboard page
        success: function(result){
            if (result.msg == "success") {
                localStorage.setItem("email", email.value);
                window.location.replace(result.url+"?name="+result.name);
            }
            else {
                loginMsg.innerHTML = result.msg;
            }
        }
    });
}