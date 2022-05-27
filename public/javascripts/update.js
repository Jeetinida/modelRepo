function updateUser() {
    const email = document.getElementById("email");
    const name = document.getElementById("name");
    const emailCheck = localStorage.getItem("email");
    let updateMsg = "";
    if (email.value == emailCheck) {
        // AJAX Request to update the user data
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/updateUser",
            contentType: "application/json",
            // data: JSON.parse(JSON.stringify($("#add-report-form").serializeArray())),
            data: JSON.stringify({name: name.value, email: email.value}),
            // on a success we are redirecting it to dashboard page
            success: function(result){
                updateMsg = result.msg;
                const updatedMessage = document.getElementById("updateMsg");
                updatedMessage.innerHTML = updateMsg;   
            }
        });
    }
    else {
        const updatedMessage = document.getElementById("updateMsg");
        updatedMessage.innerHTML = "Enter your own email address";  
    }

}