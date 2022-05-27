
function deleteUser() {
    const emailCheck = localStorage.getItem("email");
    const email = document.getElementById("delete");
    let updatedMessage = document.getElementById("deleteMsg");

    if(emailCheck == email.value) {
        // AJAX Request to update the user data
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/deleteUser",
            contentType: "application/json",
            // data: JSON.parse(JSON.stringify($("#add-report-form").serializeArray())),
            data: JSON.stringify({email: email.value}),
            // on a success we are redirecting it to dashboard page
            success: function(result){
                // when the delete is successfull remove the localstorage
                localStorage.removeItem("email");
                window.location.replace('/')  
            }
        });
    } else {
        updatedMessage.innerHTML = "Enter your own email address.";
    }
}