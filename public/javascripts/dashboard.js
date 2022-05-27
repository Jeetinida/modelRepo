// fetching the url and extracting the name param from it
// old approach
/* const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nameParam = urlParams.get('name'); */

const email = localStorage.getItem("email");

// getting reference of the div and updating it
leftRegion = document.getElementById("left-region");
// ajax request to fetch the name
$.ajax({
    type: "POST",
    url: "http://localhost:3000/getName",
    contentType: "application/json",
    // data: JSON.parse(JSON.stringify($("#add-report-form").serializeArray())),
    data: JSON.stringify({email: email}),
    // on a success we are redirecting it to dashboard page
    success: function(result){
        leftRegion.innerHTML = result.name
    }
});

function counterFnc(type) {
    const counterValue = document.getElementById("value-counter");
    
    if (type == "Plus") {
        counterValue.innerHTML = parseInt(counterValue.innerHTML) + 1
    } else {
        counterValue.innerHTML = parseInt(counterValue.innerHTML) - 1
    }

}

function resetText() {
    const counterValue = document.getElementById("value-counter");

    counterValue.innerHTML = 0;
}

function startEffect() {
    const largeDiv = document.getElementById("largeDiv");
    const counterBTN = document.getElementById("value-counter");

    if (largeDiv.classList.contains("effect-class")) {
        largeDiv.classList.remove("effect-class");
        largeDiv.classList.add("larger-card");
        largeDiv.innerHTML = "Click again";
        counterBTN.innerHTML = parseInt(counterBTN.innerHTML) + 1
    } else {
        largeDiv.classList.add("effect-class");
        largeDiv.classList.remove("larger-card");
        largeDiv.innerHTML = "";
    }
}

